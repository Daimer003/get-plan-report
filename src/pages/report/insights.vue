<template>
   <div class="w-full">
     <StrengthsHeader  />
     <Fortalezas />
     <Brechas />
     <Risks />
     <Quickwins />
     <Preguntas />
   </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import Brechas from '@/components/report/Brechas.vue';
import Fortalezas from '@/components/report/Fortalezas.vue';
import StrengthsHeader from '@/components/report/StrengthsHeader.vue';
import { useReportContext } from '@/composables/useReportContext'
import { useFetchData } from '@/composables/useFetchData'
import Risks from '@/components/report/Risks.vue';
import Quickwins from '@/components/report/Quickwins.vue';
import Preguntas from '@/components/report/Preguntas.vue';

// ROUTE PARAMS
const route = useRoute()
const id = route.params.id as string
const tipo = route.params.tipo as string

const reportStore  = useReportContext()

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