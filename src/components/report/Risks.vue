<template>
  <section class="w-full flex">
    <div class="w-full max-w-[99%]  2xl:max-w-[80%] flex justify-end bg-white p-6 mr-[40px] 2xl:mr-[100px]">
      <div class="w-full max-w-[99%] 2xl:max-w-[80%]">

        <!-- ICONO + TÍTULO -->
        <div class="flex flex-col gap-[24px]">

          <div class="w-[48px]">
            <IconBadge src="/assets/svgs/icon-25.png" :size="66" outerColor="#FFD6EA" middleColor="#FFD6EA"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>

          <h2 class="text-[30px] font-bold text-[#1A1A1A]">
            Riesgos y tensiones
          </h2>
        </div>

        <!-- LISTA -->
        <div class="space-y-8 mt-[24px]">

          <div v-for="(item, i) in tensiones" :key="i" class="flex items-start gap-4">
            <!-- CHECK ICON -->
            <div class="min-w-[32px] min-h-[32px] rounded-full bg-[#FDE4EF] 
            flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.3333 19.8333L19.8333 16.3333L16.3333 12.8333M11.6666 8.16659L8.16659 11.6666L11.6666 15.1666M25.6666 13.9999C25.6666 20.4432 20.4432 25.6666 13.9999 25.6666C7.5566 25.6666 2.33325 20.4432 2.33325 13.9999C2.33325 7.5566 7.5566 2.33325 13.9999 2.33325C20.4432 2.33325 25.6666 7.5566 25.6666 13.9999Z"
                  stroke="#C72E82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>

            <!-- CONTENIDO -->
            <div>
              <h3 class="text-[#475467] font-semibold text-[18px] leading-tight">
                {{ item.fortaleza }}
              </h3>

              <p class="text-[#475467] text-[18px] leading-relaxed mt-1 font-normal">
                {{ item.tension }}
              </p>
            </div>
          </div>

          <div v-for="(item, i) in riesgos" :key="i" class="flex items-start gap-4">
            <!-- CHECK ICON -->
            <div class="min-w-[32px] min-h-[32px] rounded-full bg-[#FDE4EF] 
            flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.3333 19.8333L19.8333 16.3333L16.3333 12.8333M11.6666 8.16659L8.16659 11.6666L11.6666 15.1666M25.6666 13.9999C25.6666 20.4432 20.4432 25.6666 13.9999 25.6666C7.5566 25.6666 2.33325 20.4432 2.33325 13.9999C2.33325 7.5566 7.5566 2.33325 13.9999 2.33325C20.4432 2.33325 25.6666 7.5566 25.6666 13.9999Z"
                  stroke="#C72E82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>

            <!-- CONTENIDO -->
            <div>
              <h3 class="text-[#475467] font-semibold text-[18px] leading-tight">
                {{ item.riesgo }}
              </h3>

              <p v-for="(det, i) in item.detonantes" :key="i"
                class="text-[#475467] text-[18px] leading-relaxed mt-1 font-normal">
                {{ det }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>


  </section>
</template>

<script setup>
import IconBadge from '../ui/IconBadge.vue';
import { computed } from 'vue'
import { useReportContext } from '@/composables/useReportContext'
import { takeFirst, takeLast } from '@/utils/funtions';

/* -------------------------------------------------
   OBTENER REPORTE GLOBAL DESDE EL CONTEXTO
-------------------------------------------------- */
const { data } = useReportContext()
const tensiones = computed(() => takeFirst(data.value?.report.riesgos_tensiones_top5.items, 1) || {})
const riesgos = computed(() => takeLast(data.value?.report.riesgos_tensiones_top5.items, 2) || {})

</script>

<style scoped></style>