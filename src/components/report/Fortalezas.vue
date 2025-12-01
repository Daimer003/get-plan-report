<template>
  <section class="w-full flex">
    <div class="w-full max-w-[99%]  2xl:max-w-[80%] flex justify-end bg-white p-6 mr-[40px] 2xl:mr-[100px] py-10">
      <div class="w-full max-w-[99%] 2xl:max-w-[80%]">

        <!-- ICONO + TÍTULO -->
        <div class="flex flex-col gap-[24px]">

          <div class="w-[48px]">
            <IconBadge src="/assets/svgs/icon-23.svg" :size="66" outerColor="#FFD6EA" middleColor="#FFD6EA"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>

          <h2 class="text-[30px] font-bold text-[#1A1A1A]">
            Top 5 Fortalezas
          </h2>
        </div>

        <!-- LISTA -->
        <div class="space-y-8 mt-[24px]">

          <div v-for="(item, i) in fortalezas" :key="i" class="flex items-start gap-4">
            <!-- CHECK ICON -->
            <div class="min-w-[32px] min-h-[32px] rounded-full bg-[#FDE4EF] 
            flex items-center justify-center">
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12.5375 0.320176L4.18414 8.38184L1.96747 6.01351C1.55914 5.62851 0.917473 5.60518 0.450807 5.93184C-0.00419315 6.27018 -0.132527 6.86518 0.147473 7.34351L2.77247 11.6135C3.02914 12.0102 3.47247 12.2552 3.97414 12.2552C4.45247 12.2552 4.90747 12.0102 5.16414 11.6135C5.58414 11.0652 13.5991 1.51018 13.5991 1.51018C14.6491 0.436843 13.3775 -0.508157 12.5375 0.30851V0.320176Z"
                  fill="#E93E95" />
              </svg>
            </div>

            <!-- CONTENIDO -->
            <div>
              <h3 class="text-[#475467] font-semibold text-[18px] leading-tight">
                {{ item.fortaleza }}
              </h3>

              <p class="text-[#475467] text-[18px] leading-relaxed mt-1 font-normal">
                {{ item.donde_se_ve }}
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
import {  computed } from 'vue'
import { useReportContext } from '@/composables/useReportContext'

/* -------------------------------------------------
   OBTENER REPORTE GLOBAL DESDE EL CONTEXTO
-------------------------------------------------- */
const { data } = useReportContext()
const fortalezas = computed(() => data.value?.report.fortalezas_top5.items || {})


</script>

<style scoped></style>