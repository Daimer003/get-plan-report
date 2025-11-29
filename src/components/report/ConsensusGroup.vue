<template>
  <div class="flex justify-center gap-8 w-full bg-white p-6">
    <div class="flex w-full flex-row max-w-[1280px] mt-[64px]">

      <!-- Sidebar lista de grupos -->
      <aside class="w-64 flex-shrink-0 pr-6 hidden lg:block">
        <ul class="space-y-6">
          <li v-for="g in groups" :key="g.nivel">
            <button @click="selectGroup(g.nivel)" class="relative block w-full text-left transition" :class="[
              'text-[14px] font-semibold', // tamaño + peso
              current === g.nivel
                ? 'text-[#A00B64]'
                : 'text-[#5A6175] hover:text-[#353B4A]'
            ]">
              <!-- Barra vertical cuando está activo -->
              <span v-if="current === g.nivel"
                class="absolute left-0 top-1/2 -translate-y-1/2 h-[32px] w-[4px] bg-[#A00B64]"></span>

              <span class="pl-6 block">
                {{ g.nivel }}
              </span>
            </button>
          </li>
        </ul>
      </aside>

      <!-- Contenido principal -->
      <main class="flex-1 space-y-8">

        <!-- Header -->
        <div class="flex items-center justify-between flex-wrap gap-4 border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-4">
            <img v-if="activeGroup.avatar" :src="activeGroup.avatar" class="w-16 h-16 rounded-full object-cover" />
            <div>
              <p class="text-sm text-gray-500">Entrevistados de</p>
              <h2 class="text-xl font-semibold text-gray-900">{{ activeGroup.title }}</h2>
            </div>
          </div>
        </div>

        <!-- Grid de perspectivas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

          <!-- Qué quieren -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Qué quieren</h3>
            <ul class="space-y-2 text-gray-700 list-disc pl-5">
              <li v-for="(item, i) in activeGroup.lists.want" :key="'want-' + i">{{ item.texto }}</li>
              <li v-if="activeGroup.lists.want?.length === 0" class="text-gray-400 italic">
                Sin datos disponibles
              </li>
            </ul>
          </div>

          <!-- Qué sienten que funciona bien -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Qué sienten que funciona bien</h3>
            <ul class="space-y-2 text-gray-700 list-disc pl-5">
              <li v-for="(item, i) in activeGroup.lists.good" :key="'good-' + i">{{ item.texto }}</li>
              <li v-if="activeGroup.lists.good?.length === 0" class="text-gray-400 italic">
                Sin datos disponibles
              </li>
            </ul>
          </div>

          <!-- Qué temen -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Qué temen</h3>
            <ul class="space-y-2 text-gray-700 list-disc pl-5">
              <li v-for="(item, i) in activeGroup.lists.fear" :key="'fear-' + i">{{ item.texto }}</li>
              <li v-if="activeGroup.lists.fear?.length === 0" class="text-gray-400 italic">
                Sin datos disponibles
              </li>
            </ul>
          </div>

          <!-- Qué no funciona -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Qué sienten que NO funciona</h3>
            <ul class="space-y-2 text-gray-700 list-disc pl-5">
              <li v-for="(item, i) in activeGroup.lists.bad" :key="'bad-' + i">{{ item.texto }}</li>
              <li v-if="activeGroup.lists.bad?.length === 0" class="text-gray-400 italic">
                Sin datos disponibles
              </li>
            </ul>
          </div>

        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useReportContext } from '@/composables/useReportContext'
import { takeFirst } from '@/utils/funtions'
import { nextTick } from 'vue'

const avatarByRole = {
  "directivo": "/assets/images/24.png",
  "gerente": "/assets/images/20.png",
  "lider": "/assets/images/21.png",
  "colaborador": "/assets/images/20.png",
  "analista": "/assets/images/24.png",

  // fallback general por si llega un rol inesperado
  "default": "/assets/images/21.png"
}

    // Normalizador
  const normalize = (str) =>
  (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()

/* -------------------------------------------------
   OBTENER REPORTE GLOBAL DESDE EL CONTEXTO
-------------------------------------------------- */
const { data } = useReportContext()
const report = computed(() => data.value?.report || {})

/* -------------------------------------------------
   LISTA DE GRUPOS (MAPA VOCES)
-------------------------------------------------- */
const groups = computed(() => {
  return report.value?.mapa_voces_por_nivel?.items || []
})

/* -------------------------------------------------
   GRUPO ACTUAL (selección automática)
-------------------------------------------------- */
const current = ref(null)

watch(
  () => report.value?.mapa_voces_por_nivel?.items,
  async (items) => {
    if (!items || items.length === 0) return



    const target = normalize("Líder de área o proceso")

    // Buscar coincidencia
    const preferido = items.find((g) => {
      const n = normalize(g.nivel)
      return (
        n === target ||
        n.includes("lider de area") ||
        n.includes("lider de proceso") ||
        n.includes("lider")
      )
    })

    // Esperar reactividad
    await nextTick()

    // Seleccionar el líder si existe
    if (preferido) {
      current.value = preferido.nivel
      return
    }

    // Fallback: primer grupo
    if (!current.value) current.value = items[0].nivel
  },
  {
    immediate: true,
    deep: true,
    flush: 'post' //  CLAVE: se ejecuta DESPUÉS del render y después de que el contexto cargue
  }
)

/* -------------------------------------------------
   GRUPO ACTIVO + MAPPING DE CAMPOS
-------------------------------------------------- */
const activeGroup = computed(() => {
  const g = groups.value.find(x => x.nivel === current.value)

  if (!g) {
    return { title: '', avatar: '', lists: { want: [], good: [], fear: [], bad: [] } }
  }

  const nivelNormalizado = normalize(g.nivel)

  // Avatar según rol (si no viene avatar del backend)
  const roleAvatar =
    avatarByRole[nivelNormalizado] ||
    avatarByRole.default

  return {
    title: g.nivel,
    avatar: g.avatar || roleAvatar,
    lists: {
      want: takeFirst(g.quieren, 3) || [],
      good: takeFirst(g.que_funciona, 3) || [],
      fear: takeFirst(g.temen, 3) || [],
      bad: takeFirst(g.que_no_funciona, 3) || []
    }
  }
})

/* -------------------------------------------------
   CAMBIAR GRUPO
-------------------------------------------------- */
const selectGroup = (nivel) => {
  current.value = nivel
}
</script>

<style scoped></style>