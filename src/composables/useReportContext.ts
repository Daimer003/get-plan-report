import { ref, computed } from 'vue'
import { useStorage, createGlobalState } from '@vueuse/core'

interface ReportSection<T = any> {
  items: T[]
  seccion_informe: string
  qa_report?: Record<string, any>
  quick_wins?: Record<string, any>
  renuncia_clave?: Record<string, any>
}

export interface ReportData {
  status: boolean
  report: {
    resumen_ejecutivo: ReportSection
    brechas_top8: ReportSection
    consenso_por_necesidad: ReportSection
    fortalezas_top5: ReportSection
    mapa_voces_por_nivel: ReportSection
    oportunidades_quickwins: ReportSection
    preguntas_y_supuestos: ReportSection
    riesgos_tensiones_top5: ReportSection
  }
}

interface CachedReports {
  [key: string]: ReportData
}

/**
 * Store Global de Reportes con Cache por ID+tipo
 */
export const useReportContext = createGlobalState(() => {
  // Guarda todos los reportes cacheados
  const cachedReports = useStorage<CachedReports>('global-report-cache', {})

  const loading = ref(false)
  const error = ref<string | null>(null)

  // Reporte activo (el último seleccionado)
  const currentKey = ref<string | null>(null)

  const data = computed(() => {
    if (!currentKey.value) return null
    return cachedReports.value[currentKey.value] || null
  })

  function setCurrentReport(id: string | number, tipo: string) {
    currentKey.value = `${tipo}-${id}`
  }

  function saveReport(id: string | number, tipo: string, report: ReportData) {
    const key = `${tipo}-${id}`
    cachedReports.value[key] = report
    currentKey.value = key
  }

  function getCachedReport(id: string | number, tipo: string): ReportData | null {
    const key = `${tipo}-${id}`
    return cachedReports.value[key] || null
  }

  function clearCache() {
    cachedReports.value = {}
    currentKey.value = null
  }

  return {
    data,
    loading,
    error,

    currentKey,
    cachedReports,

    setCurrentReport,
    saveReport,
    getCachedReport,
    clearCache,

    setLoading: (v: boolean) => (loading.value = v),
    setError: (msg: string | null) => (error.value = msg),
  }
})