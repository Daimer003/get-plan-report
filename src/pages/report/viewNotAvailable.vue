<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header estilo Get a Plan -->
    <header
      class="h-[280px] bg-[#8A0F55] text-white flex flex-col justify-center items-center relative"
    >
      <div class="absolute inset-0 bg-[#8A0F55] bg-opacity-90"></div>

      <div class="relative z-10 text-center px-4">
        <p class="text-sm opacity-80">Get a Plan</p>
        <h1 class="text-4xl font-bold mt-2">
          Iniciar proceso de reporte
        </h1>
        <p class="mt-1 opacity-80">Validación de acceso</p>
      </div>
    </header>

    <div class="flex justify-center items-center rounded-lg m-4">
      <!-- Contenido -->
      <main class="flex w-full max-w-[900px] flex-col bg-white items-center text-center mt-16 p-4">

        <div class="flex items-center gap-2 mb-6 border border-[#C93E8A] rounded-full px-3 py-1 bg-[#C93E8A]/5">
          <span class="text-[#C93E8A] text-xs font-medium px-3 py-1 rounded-full border border-[#C93E8A] bg-white">
            Importante
          </span>

          <span class="text-[#C93E8A] text-xs font-medium px-3 py-1">
            Validación
          </span>
        </div>

        <h2 class="text-3xl font-semibold text-[#8A0F55] mb-4">
          Necesita un ID para iniciar el proceso del reporte.
        </h2>

        <p class="text-gray-600 max-w-xl mb-10">
          Para continuar, por favor asegúrese de que la URL contenga un identificador 
          de reporte válido o ingréselo manualmente a continuación.
        </p>

        <!-- Campo para ingresar ID -->
        <div class="flex flex-col items-center w-full max-w-sm">
          <input
            v-model="reportId"
            type="text"
            placeholder="Ingrese el ID del reporte"
            class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#C93E8A]"
          />

          <button
            @click="startProcess"
            class="mt-4 bg-[#8A0F55] text-white px-6 py-2 rounded-full font-medium hover:bg-[#761048] transition min-w-xs"
          >
            Iniciar
          </button>

          <!-- Nuevo botón: Recuperar URL -->
          <button
            @click="restoreLastUrl"
            class="mt-4 border border-[#8A0F55] text-[#8A0F55] px-6 py-2 rounded-full font-medium hover:bg-[#8A0F55] hover:text-white transition min-w-xs"
          >
            Recuperar URL
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Input manual
const reportId = ref('')
// Tipo por defecto si el usuario lo ingresa manualmente
const reportType = ref('INTERVIEW')

function startProcess() {
  if (!reportId.value) {
    alert('Debe ingresar un ID para continuar.')
    return
  }

  const url = `/reportes/${reportType.value}/${reportId.value}`
  router.push(url)
}

/**
 * Recupera la última URL válida guardada por useReportContext
 * en localStorage ("global-report-cache")
 */
function restoreLastUrl() {
  const cache = localStorage.getItem('global-report-cache')

  if (!cache) {
    alert('No hay una URL previa almacenada.')
    return
  }

  const parsed = JSON.parse(cache)

  const keys = Object.keys(parsed)
  if (keys.length === 0) {
    alert('No hay reportes guardados en la memoria.')
    return
  }

  // Última clave guardada (tipo-id)
  const lastKey = keys[keys.length - 1]

  const [tipo, id] = lastKey.split('-')

  if (!tipo || !id) {
    alert('La información almacenada no es válida.')
    return
  }

  const url = `/reportes/${tipo}/${id}`
  router.push(url)
}
</script>