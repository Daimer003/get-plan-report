<template>
    <div class="w-full flex">
        <div class="w-full max-w-[99%]  2xl:max-w-[80%] flex justify-start bg-white p-6 ml-[40px] 2xl:ml-[600px] py-10">
            <div class="w-full w-[99%] 2xl:w-[80%]">


                <div class="p-6 bg-white min-h-screen">

                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-[48px]">
                            <IconBadge src="/assets/svgs/icon-26.png" :size="66" outerColor="#FFD6EA"
                                middleColor="#FFD6EA" innerColor="#6E33A51A" shadowColor="rgba(110,51,165,0.25)"
                                pulseColor="rgba(110,51,165,0.15)" />
                        </div>
                        <h1 class="text-3xl font-bold text-gray-800 ml-5">Oportunidades / QuickWins</h1>
                    </div>

                    <div class="space-y-6">
                        <div v-for="(item, index) in items" :key="index"
                            class="bg-white shadow rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                            <!-- Etiquetas -->
                            <div class="flex flex-wrap items-center gap-3 mb-3">
                                <span v-for="(tag, i) in [item.dueno]" :key="i"
                                    class="px-2 py-0 rounded-full border text-[14px] font-medium bg-[#EFF8FF] border-[#C7D8FF] text-[#175CD3]">
                                    <!-- {{ tag }} -->

                                    Talento Humano
                                </span>

                                <span class="flex items-center gap-1 text-sm text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Corto Plazo
                                    <!-- {{ item.horizonte }} -->
                                </span>
                            </div>

                            <!-- Descripción principal -->
                            <p class="text-gray-800 text-lg leading-relaxed mb-2">
                                {{ item.texto }}
                            </p>

                            <!-- Primer hito -->
                            <p class="text-[#E93E95] font-normal">PRIMER HITO:
                                <span class="font-normal text-gray-700">
                                    <!-- {{ item.primer_hito }} -->
                                    Definir la métrica y construir el primer tablero de visualización.
                                </span>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useReportContext } from '@/composables/useReportContext'
import IconBadge from '../ui/IconBadge.vue';


/* -------------------------------------------------
   OBTENER REPORTE GLOBAL DESDE EL CONTEXTO
-------------------------------------------------- */
const { data } = useReportContext()
const items = data.value?.report.oportunidades_quickwins.items



//     name: "QuickWinsComponent",
//     data() {
//         return {
//             items: [
//                 {
//                     tags: ["Talento Humano"],
//                     plazo: "Corto Plazo",
//                     descripcion:
//                         "Implementar un sistema de reconocimiento no monetario (felicitaciones públicas, notas de agradecimiento) para elevar la moral.",
//                     hito: "Definir 3 formas de reconocimiento y comunicar a líderes.",
//                 },
//                 {
//                     tags: ["Operaciones"],
//                     plazo: "Corto Plazo",
//                     descripcion:
//                         "Delegar la anulación de recibos de caja a los subdirectores de oficina para agilizar el servicio al asociado.",
//                     hito: "Modificar y comunicar el nuevo procedimiento.",
//                 },
//                 {
//                     tags: ["Bienestar", "Talento Humano"],
//                     plazo: "Corto Plazo",
//                     descripcion:
//                         "Crear y publicar un cronograma semestral de actividades de bienestar para generar orden y compromiso.",
//                     hito: "Consolidar y publicar el cronograma del próximo semestre.",
//                 },
//                 {
//                     tags: ["Procesos", "Calidad"],
//                     plazo: "Corto Plazo",
//                     descripcion:
//                         "Iniciar la creación de manuales de procedimientos visuales (paso a paso) para sistemas clave como Linix.",
//                     hito: "Documentar el primer proceso crítico identificado por los equipos.",
//                 },
//                 {
//                     tags: ["Tecnología", "Procesos"],
//                     plazo: "Mediano Plazo",
//                     descripcion: "Seleccionar y diseñar el flujo digital del primer proceso.",
//                     hito: "Documentar el primer proceso crítico identificado por los equipos.",
//                 },
//                 {
//                     tags: ["Tecnología"],
//                     plazo: "Mediano Plazo",
//                     descripcion:
//                         "Establecer una mesa de ayuda de TI formal con Acuerdos de Nivel de Servicio (SLA) para los tiempos de respuesta.",
//                     hito: "Definir y comunicar los SLA para criticidad alta, media y baja.",
//                 },
//                 {
//                     tags: ["Talento Humano"],
//                     plazo: "Mediano Plazo",
//                     descripcion:
//                         "Diseñar y lanzar un programa piloto de capacitación en liderazgo y gestión operativa para subdirectores.",
//                     hito: "Diseñar el contenido y la estructura del programa piloto.",
//                 },
//                 {
//                     tags: ["Comercial", "Financiera"],
//                     plazo: "Mediano Plazo",
//                     descripcion:
//                         "Definir e implementar un indicador (KPI) de captación de ahorros con un reporte de seguimiento periódico.",
//                     hito: "Definir la métrica y construir el primer tablero de visualización.",
//                 },
//             ],
//         };
//     },
// };
</script>

<style scoped></style>
