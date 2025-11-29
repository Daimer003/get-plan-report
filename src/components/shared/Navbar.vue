<template>
  <header
    :class="[
      'flex w-full justify-center py-4 z-50 transition-all duration-300',
      scrolled
        ? 'fixed top-0 bg-black/60 backdrop-blur-md shadow-lg'
        : 'absolute top-0'
    ]"
  >
    <div class="flex w-full max-w-[1400px] items-center justify-between px-6">
      <!-- Logo -->
      <div class="cursor-pointer">
        <img src="/assets/svgs/logo.svg" alt="Logo de geta plan" />
      </div>

      <!-- Botón hamburguesa -->
      <button
        @click="toggleMenu"
        class="text-white text-3xl md:hidden focus:outline-none"
      >
        <span v-if="!open">☰</span>
        <span v-else>✕</span>
      </button>

      <!-- Navegación en escritorio -->
      <nav class="hidden md:flex gap-10">
        <RouterLink
          v-for="r in routes"
          :key="r.name"
          :to="r.to"
          class="nav-link text-white"
          :class="{ 'nav-link--active': isActive(r.to) }"
        >
          {{ r.label }}
        </RouterLink>
      </nav>
    </div>

    <!-- Navegación móvil -->
    <transition name="fade">
      <nav
        v-if="open"
        class="flex flex-col gap-6 absolute top-full left-0 w-full h-screen bg-black/70 backdrop-blur-sm py-6 px-6 md:hidden"
      >
        <RouterLink
          v-for="r in routes"
          :key="r.name"
          :to="r.to"
          class="nav-link text-lg text-white"
          :class="{ 'nav-link--active': isActive(r.to) }"
          @click="closeMenu"
        >
          {{ r.label }}
        </RouterLink>
      </nav>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Params reales del reporte
const tipo = computed(() => route.params.tipo as string)
const id = computed(() => route.params.id as string)

// Construcción dinámica de menú
const routes = computed(() => [
  {
    name: 'report.summary',
    label: 'Resumen ejecutivo',
    to: `/reportes/${tipo.value}/${id.value}`,
  },
  {
    name: 'report.consensus',
    label: 'Consenso de voces',
    to: `/consensus/${tipo.value}/${id.value}`,
  },
  {
    name: 'report.insights',
    label: 'Fortalezas, Brechas y Oportunidades',
    to: `/insights/${tipo.value}/${id.value}`,
  }
])

const isActive = (path: string) => route.path.startsWith(path)

const toggleMenu = () => (open.value = !open.value)
const closeMenu = () => (open.value = false)
</script>


<style>
.nav-link {
  position: relative;
  opacity: 0.75;
  transition: all 0.25s ease;
}

.nav-link:hover {
  opacity: 1;
}

/* ESTADO ACTIVO */
.nav-link--active {
  opacity: 1;
  font-weight: 700;
}

/* BARRA INFERIOR ANIMADA */
.nav-link--active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  height: 3px;
  width: 100%;
  background: #ffffff;
  border-radius: 4px;
  animation: fadeSlideIn 0.25s ease forwards;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>