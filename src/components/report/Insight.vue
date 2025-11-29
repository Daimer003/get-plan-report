<template>
  <div class="flex w-full justify-center pt-[50px] pb-10 bg-white p-6">
    <div class="w-full max-w-[1280px] " ref="paginationRef">

      <div class="flex flex-col justify-start gap-[24px]">
        <div class="w-[48px]">
          <IconBadge src="/assets/svgs/icon-23.svg" :size="66" outerColor="#FFD6EA" middleColor="#FFD6EA"
            innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
        </div>

        <h3 class="text-[#101828] text-[30px] font-semibold" >
          Consenso por necesidades de información (Todas las preguntas)
        </h3>
      </div>


      <!-- GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[64px] mb-20">
        <!-- CARD -->
        <div v-for="(item, i) in paginatedItems" :key="i" class="bg-[#F9FAFB] p-6 space-y-5 rounded-lg">

          <!-- TÍTULO + ICONO -->
          <div class="flex items-start gap-3">
            <div class="w-[50px] h-[50px] flex items-center justify-center">
              <img src="/assets/images/featured.png" alt="Icono featured" />
            </div>

            <h3 class="text-lg font-semibold text-gray-900">
              {{ item.titulo }}
            </h3>
          </div>

          <!-- TAGS SUPERIORES -->
          <div class="flex flex-wrap gap-3 mt-2">
            <span v-for="(tag, idx) in item.niveles_participantes" :key="idx"
              class="px-2 py-0 rounded-full border text-[14px] font-medium bg-[#FDE8F2] border-[#EEA5C9] text-[#C42C7D]">
              {{ tag }}
            </span>
          </div>

          <!-- DESCRIPCIÓN -->
          <p class="text-gray-700 leading-relaxed">
            {{ item.texto_consenso }}
          </p>

          <!-- TAGS INFERIORES -->
          <div v-if="item.palabras_clave_comunes?.length" class="flex flex-wrap gap-3 pt-2">
            <span v-for="(tag, idx) in item.palabras_clave_comunes" :key="idx"
              class="px-2 py-0 rounded-full border text-[14px] font-medium bg-[#EFF8FF] border-[#C7D8FF] text-[#175CD3]">
              {{ tag }}
            </span>
          </div>

        </div>
      </div>

      <!-- PAGINACIÓN -->
      <div class="flex w-full justify-center items-center gap-4  transition-opacity duration-300"
        :class="isStickyVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'">
     <div class="flex justify-center w-full shadow-md bg-white z-50 border border-gray-200 fixed bottom-0 left-1/2 -translate-x-1/2 ">
         <div class="flex justify-center items-center gap-4 px-4 py-3 ">

          <button
            class="px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-40 bg-[#EFF8FF] border border-[#C7D8FF] text-[#175CD3]"
            :disabled="page === 1" @click="page--">
            ◀ Anterior
          </button>

          <span class="text-gray-700 font-medium text-xs md:text-md">
            Página {{ page }} de {{ totalPages }}
          </span>

          <button
            class="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-40 bg-[#FDE8F2] border-[#EEA5C9] text-[#C42C7D]"
            :disabled="page === totalPages" @click="page++">
            Siguiente ▶
          </button>
        </div>
     </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useReportContext } from '@/composables/useReportContext'
import IconBadge from '../ui/IconBadge.vue'


const paginationRef = ref(null)
const isStickyVisible = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isStickyVisible.value = entry.isIntersecting
    },
    { threshold: 0.1 }
  )

  if (paginationRef.value) {
    observer.observe(paginationRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer && paginationRef.value) observer.unobserve(paginationRef.value)
})

/* -------------------------
   CARGA DEL REPORTE
-------------------------- */
const { data } = useReportContext()
const report = computed(() => data.value?.report || {})

const items = computed(() => {
  return report.value?.consenso_por_necesidad?.items || []
})

/* -------------------------
   PAGINACIÓN
-------------------------- */
const page = ref(1)
const pageSize = 6

const totalPages = computed(() =>
  Math.max(1, Math.ceil(items.value.length / pageSize))
)

const paginatedItems = computed(() => {
  const start = (page.value - 1) * pageSize
  return items.value.slice(start, start + pageSize)
})

// Si el usuario cambia los datos y la página ya no existe, se ajusta
watchEffect(() => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value
  }
})
</script>