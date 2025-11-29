<template>
  <section class="flex justify-center bg-[#0f111a] w-full text-white py-16 px-6 md:px-20">

    <div class="flex justify-center items-center flex-col w-full max-w-[1280px]">

      <!-- TITULOS ESTÁTICOS (SE CONSERVAN) -->
      <div class="text-center">
        <p class="text-sm uppercase font-semibold text-gray-400 mb-2">
          Lo que guiará el futuro de la organización
        </p>
        <h2 class="text-3xl md:text-5xl font-bold mb-4">Apuestas estratégicas</h2>
        <p class="text-gray-300 italic text-lg mb-12">
          En qué se debería concentrarse la organización en los siguientes 3 años, y a qué debería renunciar para
          enfocarse en esa apuesta estratégica
        </p>
      </div>

      <!-- APUESTAS + RENUNCIA (3 COLUMNS) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">

        <!-- Apuesta 1 -->
        <div>
          <div class="flex justify-center mb-4">
            <IconBadge src="/assets/svgs/arrow.svg" :size="66" outerColor="#1e2939" middleColor="#475467"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>
          <h3 class="font-bold text-lg mb-2">Apuesta 1</h3>
          <p class="text-gray-300 text-sm">
            {{ array[0]?.texto }}
          </p>
        </div>

        <!-- Apuesta 2 -->
        <div>
          <div class="flex justify-center mb-4">
            <IconBadge src="/assets/svgs/arrow.svg" :size="66" outerColor="#1e2939" middleColor="#475467"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>
          <h3 class="font-bold text-lg mb-2">Apuesta 2</h3>
          <p class="text-gray-300 text-sm">
            {{ array[1]?.texto }}
          </p>
        </div>

        <!-- Renuncia clave -->
        <div>
          <div class="flex justify-center mb-4">
            <IconBadge src="/assets/svgs/icon-zap-off.svg" :size="66" outerColor="#d0d5dd" middleColor="#F2F4F7"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>
          <h3 class="font-bold text-lg mb-2">Renuncia Clave</h3>
          <p class="text-gray-300 text-sm">
            {{ array[2]?.texto }}
          </p>
        </div>

      </div>

      <!-- QUICK WINS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">

        <div>
          <div class="flex justify-center mb-4">
            <IconBadge src="/assets/svgs/arrow.svg" :size="66" outerColor="#1e2939" middleColor="#475467"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>
          <h3 class="font-bold text-lg mb-2">Quick Win - Corto plazo</h3>
          <p class="text-gray-300 text-sm">
            {{ array[3]?.texto }}
          </p>
        </div>

        <div>
          <div class="flex justify-center mb-4">
            <IconBadge src="/assets/svgs/arrow.svg" :size="66" outerColor="#1e2939" middleColor="#475467"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>
          <h3 class="font-bold text-lg mb-2">Quick Win - Mediano plazo</h3>
          <p class="text-gray-300 text-sm">
            {{ array[4]?.texto }}
          </p>
        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import IconBadge from '../ui/IconBadge.vue';
import { computed } from 'vue'
import { useReportContext } from '@/composables/useReportContext'
import { mergeAndEnumerate, takeFirst } from '@/utils/funtions'

const { data } = useReportContext()

const report = computed(() => data.value?.report?.resumen_ejecutivo || {})

// Crear array final ya enumerado y ordenado, donde cambie algo esto se va para marte...
const array = computed(() =>
  mergeAndEnumerate(
    takeFirst(report.value.apuestas_3_5_anios, 2),
    [report.value.renuncia_clave],
    [
      report.value.quick_wins.corto_plazo?.[0],
      report.value.quick_wins.mediano_plazo?.[0]
    ]
  )
)
</script>