<template>
    <section class="w-full flex">
        <div class="w-full max-w-[99%]  2xl:max-w-[80%] flex justify-end bg-white p-6 mr-[40px] 2xl:mr-[100px] py-10">
            <div class="w-full max-w-[99%] 2xl:max-w-[80%]">

                <!-- ICONO + TÍTULO -->
                <div class="flex flex-col gap-[24px]">

                    <div class="w-[48px]">
                        <IconBadge src="/assets/svgs/icon-27.png" :size="66" outerColor="#FFD6EA" middleColor="#FFD6EA"
                            innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)"
                            pulseColor="rgba(110,51,165,0.15)" />
                    </div>

                    <h2 class="text-[30px] font-bold text-[#1A1A1A]">
                        Preguntas y supuestos
                    </h2>
                </div>

                <!-- LISTA -->
                <div class="space-y-8 mt-[24px]">

                    <div v-for="(item, i) in preguntas" :key="i" class="flex items-start gap-4">
                        <!-- CHECK ICON -->
                        <div class="min-w-[32px] min-h-[32px]  
            flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.6667 9.91928C11.8722 9.33492 12.278 8.84217 12.812 8.5283C13.3461 8.21444 13.974 8.0997 14.5845 8.20443C15.1951 8.30915 15.7488 8.62657 16.1478 9.10047C16.5467 9.57437 16.765 10.1742 16.7641 10.7936C16.7641 12.5423 14.1411 13.4167 14.1411 13.4167M14.1749 16.9167H14.1866M11.55 22.4L13.2533 24.6711C13.5066 25.0089 13.6333 25.1777 13.7886 25.2381C13.9246 25.291 14.0754 25.291 14.2114 25.2381C14.3667 25.1777 14.4934 25.0089 14.7467 24.6711L16.45 22.4C16.792 21.944 16.963 21.716 17.1716 21.5419C17.4497 21.3098 17.778 21.1456 18.1306 21.0624C18.395 21 18.68 21 19.25 21C20.8808 21 21.6962 21 22.3394 20.7336C23.197 20.3783 23.8783 19.697 24.2336 18.8394C24.5 18.1962 24.5 17.3808 24.5 15.75V9.1C24.5 7.13982 24.5 6.15972 24.1185 5.41103C23.783 4.75247 23.2475 4.21703 22.589 3.88148C21.8403 3.5 20.8602 3.5 18.9 3.5H9.1C7.13982 3.5 6.15972 3.5 5.41103 3.88148C4.75247 4.21703 4.21703 4.75247 3.88148 5.41103C3.5 6.15972 3.5 7.13982 3.5 9.1V15.75C3.5 17.3808 3.5 18.1962 3.76642 18.8394C4.12165 19.697 4.80301 20.3783 5.66061 20.7336C6.30381 21 7.1192 21 8.75 21C9.32001 21 9.60501 21 9.86942 21.0624C10.222 21.1456 10.5503 21.3098 10.8284 21.5419C11.037 21.716 11.208 21.944 11.55 22.4Z"
                                    stroke="#C72E82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                        <!-- CONTENIDO -->
                        <div>

                            <p class="text-[#475467] text-[18px] leading-relaxed mt-1 font-normal">
                                {{ item.texto }}
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

/* -------------------------------------------------
   OBTENER REPORTE GLOBAL DESDE EL CONTEXTO
-------------------------------------------------- */
const { data } = useReportContext()
const preguntas = computed(() => data.value?.report.preguntas_y_supuestos.items || {})
</script>

<style scoped></style>