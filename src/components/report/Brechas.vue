<template>
  <section class="w-full flex">
    <div class="w-full  w-[100%] flex justify-start bg-white p-6  ml-[40px] 2xl:ml-[600px] py-10">
      <div class="w-full w-[99%] 2xl:w-[80%]">

        <!-- ICONO + TÍTULO -->
        <div class="flex flex-col gap-[24px]">

          <div class="w-[48px]">
            <IconBadge src="/assets/svgs/iconn-24.png" :size="66" outerColor="#FFD6EA" middleColor="#FFD6EA"
              innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)" pulseColor="rgba(110,51,165,0.15)" />
          </div>

          <h2 class="text-[30px] font-bold text-[#1A1A1A]">
            Brechas más importantes
          </h2>
        </div>

        <!-- LISTA -->
        <div class="space-y-8 mt-[24px]">

          <div v-for="(item, i) in brechas" :key="i" class="flex items-start gap-4">
            <!-- CHECK ICON -->
            <div class=" flex min-w-[32px] min-h-[32px]
            flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.6667 24.3333C19.11 24.3333 24.3333 19.11 24.3333 12.6667C24.3333 6.22334 19.11 1 12.6667 1C6.22334 1 1 6.22334 1 12.6667C1 19.11 6.22334 24.3333 12.6667 24.3333Z"
                  fill="#FFD6EA" />
                <path
                  d="M12.6667 8V12.6667M12.6667 17.3333H12.6783M24.3333 12.6667C24.3333 19.11 19.11 24.3333 12.6667 24.3333C6.22334 24.3333 1 19.11 1 12.6667C1 6.22334 6.22334 1 12.6667 1C19.11 1 24.3333 6.22334 24.3333 12.6667Z"
                  stroke="#C72E82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>

            <!-- CONTENIDO -->
            <div>
              <h3 class="text-[#475467] font-semibold text-[18px] leading-tight">
                {{ item.brecha }}
              </h3>

              <p class="text-[#475467] text-[18px] leading-relaxed mt-1 font-normal">
                {{ item.por_que_importa }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>


  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useReportContext } from '@/composables/useReportContext'
import IconBadge from '../ui/IconBadge.vue';

/* -------------------------------------------------
   OBTENER REPORTE GLOBAL DESDE EL CONTEXTO
-------------------------------------------------- */
const { data } = useReportContext()
const brechas = computed(() => data.value?.report.brechas_top8.items || {})

</script>

<style scoped></style>