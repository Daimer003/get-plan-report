<template>
  <section class="bg-white flex justify-center text-gray-900 px-6 md:px-16 py-20">
    <div class="flex items-center flex-col w-full max-w-[1280px]">

      <!-- Encabezado -->
      <div class="flex flex-col w-full items-center mx-auto mb-16">
        <div
          class="flex w-full max-w-[209px] justify-between items-center gap-2 mb-3 border border-[#C93E8A] rounded-full p-1 bg-[#FFEAF4]">
          <span class="text-[#A00B64] text-xs font-medium px-3 py-1 rounded-full border border-[#C93E8A] bg-white">
            Líderes
          </span>
          <span class="text-[#A00B64] text-xs font-medium mr-2">
            Lectura de 5 minutos
          </span>
        </div>

        <h1 class="text-[28px] md:text-[48px] font-semibold text-[#A00B64] leading-tight">
          Resumen ejecutivo
        </h1>

         <p class="text-gray-500 italic text-[15px] mt-3 text-center">
          Principales hallazgos de las entrevistas realizadas en
          <span class="font-medium">{{ numero_participantes }}</span> participantes
          que <br /> relatan la realidad de <span class="font-medium">{{ nombre_empresa }}</span>.
        </p>
      </div>

      <!-- Contenido de columnas -->
      <div class="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div v-for="(item, index) in report.items" :key="index" class="space-y-3">
          <h3 class="text-[18px] font-semibold leading-snug">
            {{ item.titulo }}
          </h3>
          <p class="text-[15px] text-gray-700 leading-relaxed">
            {{ item.texto }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup >
import { computed } from 'vue'
import { useReportContext } from '@/composables/useReportContext'

// OBTENER CONTEXTO GLOBAL
const { data } = useReportContext()

// SECCIÓN DEL REPORTE (resumen_ejecutivo)
const report = computed(() => data.value?.report?.resumen_ejecutivo || {})
</script>

<style scoped>
section {
  font-family: 'Poppins', sans-serif;
}
</style>