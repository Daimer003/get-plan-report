<template>
    <ConsensusHeader />
    <ConsensusGroup />
    <Insight />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import ConsensusGroup from '@/components/report/ConsensusGroup.vue';
import ConsensusHeader from '@/components/report/ConsensusHeader.vue';
import Insight from '@/components/report/Insight.vue';

import { useFetchData } from '@/composables/useFetchData'
import { useReportContext } from '@/composables/useReportContext'

// ROUTE PARAMS
const route = useRoute()
const id = route.params.id as string
const tipo = route.params.tipo as string

// GLOBAL STORE
const reportStore = useReportContext()

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
