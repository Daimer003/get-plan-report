<template>
  <div>
    <Header />

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-10 text-gray-500">
      Cargando reporte...
    </div>

    <!-- ERROR -->
    <div v-if="error" class="text-center py-10 text-red-600">
      {{ error }}
    </div>

    <!-- CONTENIDO -->
    <div v-if="data.status">
      <ExecutiveSummary  />
      <StrategicBets  />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import Header from '@/components/shared/Header.vue'
import ExecutiveSummary from '@/components/report/ExecutiveSummary.vue'
import StrategicBets from '@/components/report/StrategicBets.vue'

import { useFetchData } from '@/composables/useFetchData'
import { useReportContext } from '@/composables/useReportContext'

// ROUTE PARAMS
const route = useRoute()
const id = route.params.id as string
const tipo = route.params.tipo as string

// GLOBAL STORE
const reportStore = useReportContext()
const { data, loading, error } = reportStore


// SELECCIONAR REPORTE ACTUAL
reportStore.setCurrentReport(id, tipo)

// REVISAR SI YA EXISTE EN CACHE GLOBAL
const cached = reportStore.getCachedReport(id, tipo)

if (!cached) {
  // NO EXISTE → HACER FETCH
  const { data: fetchedData, error: fetchError, loading: fetchLoading } = useFetchData(id, tipo)

  // REACCIONAR A LOS CAMBIOS DEL FETCH
  watchEffect(() => {
    reportStore.setLoading(fetchLoading.value)

    if (fetchedData.value) {
      reportStore.saveReport(id, tipo, fetchedData.value)
    }

    if (fetchError.value) {
      reportStore.setError(fetchError.value)
    }
  })
} else {
  // SÍ EXISTE → USAR CACHE
  console.log("⚡ Reporte cargado desde cache global:", cached)
}
</script>