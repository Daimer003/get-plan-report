<template>
  <div
    class="relative flex items-center justify-center rounded-full m-auto z-0 transition-all duration-500 ease-out hover:scale-110"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: outerColor,
      boxShadow: isHovered
        ? `0 0 25px ${shadowColor}`
        : 'none'
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Círculo medio -->
    <div
      class="absolute inset-[8px] rounded-full transition-all duration-500 ease-out"
      :style="{ backgroundColor: middleColor }"
    ></div>

    <!-- Círculo interior -->
    <div
      class="absolute inset-[9px] rounded-full transition-all duration-500 ease-out"
      :style="{ backgroundColor: innerColor }"
    ></div>

    <!-- Ícono -->
    <img
      :src="src"
      :alt="alt"
      class="relative z-10 transition-transform duration-500 ease-out"
      :class="{ 'rotate-12': isHovered }"
      :style="{ width: `${iconSize}px` }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'icon' },
  size: { type: Number, default: 88 },
  iconSize: { type: Number, default: 28 },

  // 🎨 Colores personalizables
  outerColor: { type: String, default: '#F5EFFF' },
  middleColor: { type: String, default: '#6E33A566' },
  innerColor: { type: String, default: '#6E33A51A' },
  shadowColor: { type: String, default: 'rgba(110,51,165,0.25)' },
  pulseColor: { type: String, default: 'rgba(110,51,165,0.15)' },
})

const isHovered = ref(false)
</script>

<style scoped>
div:hover::after {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 9999px;
  animation: pulse 1.8s ease-out infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>