import { createRouter, createWebHistory } from 'vue-router'
import ReportLayout from '../layouts/ReportLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ReportLayout,
      meta: {
        requiresAuth: false,
        layout: 'report',
      },
      children: [
        // Página inicial → muestra viewNotAvailable
        {
          path: '',
          name: 'report.home',
          component: () => import('@/pages/report/viewNotAvailable.vue'),
          meta: { title: 'Reporte no disponible | Get-Plan' },
        },

        // Rutas validas: /reportes/:tipo/:id
        {
          path: 'reportes/:tipo/:id',
          name: 'report.summary',
          component: () => import('@/pages/report/index.vue'),
          meta: { title: 'Resumen Ejecutivo | Get-Plan' },
        },
        {
          path: 'consensus/:tipo/:id',
          name: 'report.consensus',
          component: () => import('@/pages/report/consensus.vue'),
          meta: { title: 'Consenso de Voces | Get-Plan' },
        },
        {
          path: 'insights/:tipo/:id',
          name: 'report.insights',
          component: () => import('@/pages/report/insights.vue'),
          meta: { title: 'Fortalezas y Brechas | Get-Plan' },
        },

        //  Cualquier ruta dentro del layout que NO coincida → viewNotAvailable
        {
          path: ':pathMatch(.*)*',
          name: 'report.not.available',
          component: () => import('@/pages/report/viewNotAvailable.vue'),
        },
      ],
    },

    //  Cualquier ruta externa al layout → viewNotAvailable
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/report/viewNotAvailable.vue'),
    },
  ],
})

// Middleware global
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
  next()
})

export default router