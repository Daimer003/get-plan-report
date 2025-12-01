<template>
  <div>
    <Header />

    <SpinnerOverlay v-if="loading" />

    <!-- ERROR -->
    <div v-if="error" class="text-center py-10 text-red-600">
      {{ error }}
    </div>

    <!-- CONTENIDO -->
    <div v-if="data.status">
      <ExecutiveSummary />
      <StrategicBets />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import Header from '@/components/shared/Header.vue'
import ExecutiveSummary from '@/components/report/ExecutiveSummary.vue'
import StrategicBets from '@/components/report/StrategicBets.vue'
import { useFetchData } from '@/composables/useFetchData'
import { useReportContext } from '@/composables/useReportContext'
import SpinnerOverlay from '@/components/ui/SpinnerOverlay.vue'

const route = useRoute()
const id = route.params.id as string
const tipo = route.params.tipo as string

const loading = ref(true)
const minLoadTime = 1000 // 1 segundo mínimo
const startTime = Date.now()

// GLOBAL STORE
const reportStore = useReportContext()
const { data, error, setLoading } = reportStore

// SELECCIONAR REPORTE ACTUAL
reportStore.setCurrentReport(id, tipo)

// REVISAR SI YA EXISTE EN CACHE GLOBAL
const cached = reportStore.getCachedReport(id, tipo)

function finalizeLoading() {
  const elapsed = Date.now() - startTime
  const remaining = Math.max(0, minLoadTime - elapsed)

  setTimeout(() => {
    loading.value = false
  }, remaining)
}

if (!cached) {
  // NO EXISTE → HACER FETCH
  const { data: fetchedData, error: fetchError, loading: fetchLoading } = useFetchData(id, tipo)

  watchEffect(() => {
    reportStore.setLoading(fetchLoading.value)

    if (fetchedData.value) {
      reportStore.saveReport(id, tipo, fetchedData.value)
      finalizeLoading()
    }

    if (fetchError.value) {
      reportStore.setError(fetchError.value)
      finalizeLoading()
    }
  })
} else {
  // EXISTE EN CACHE
  console.log("⚡ Reporte cargado desde cache global:", cached)
  finalizeLoading()
}
</script>