<template  >
    <div class="h-auto">
        <!-- Menu de navegación -->
        <Navbar />

        <div class="w-full h-auto">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/shared/Navbar.vue';

</script>