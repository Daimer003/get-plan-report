# 📘 Get a Plan — Reporte de Entrevistas y Voces

**Get a Plan Report Generator** es una aplicación web desarrollada para generar **reportes interactivos y visualmente consistentes** a partir de los resultados de entrevistas estratégicas dentro de organizaciones.  
El sistema está diseñado para transformar datos cualitativos en presentaciones limpias, corporativas y dinámicas que reflejan la voz colectiva de los equipos.

---

## 🎯 Propósito

El objetivo principal del proyecto es **automatizar la creación de reportes personalizados** para clientes de *Get a Plan*, con un enfoque en:

- Presentar hallazgos clave y estrategias organizacionales.
- Unificar la identidad visual en todos los reportes generados.
- Ofrecer una experiencia profesional, responsiva y visualmente atractiva.
- Permitir navegación fluida entre los módulos del reporte.

---

## 🧩 Módulos del Reporte

El sistema está estructurado en **tres secciones principales**, accesibles desde la barra de navegación superior:

1. **📊 Resumen Ejecutivo**  
   Principales hallazgos de las entrevistas realizadas, oportunidades estratégicas y conclusiones clave.  
   Contiene un resumen visual con componentes de texto jerarquizados y tipografía corporativa.

2. **🗣️ Consenso de Voces**  
   Representa gráficamente la opinión de los participantes.  
   Cada bloque muestra quién participó, qué opina, qué funciona y qué debe mejorar, con una distribución clara y simétrica.

3. **💡 Fortalezas, Brechas y Oportunidades**  
   Sección dedicada a mostrar insights accionables y estrategias clave basadas en la información recopilada.

---

## 🧱 Estructura del Proyecto

src/
├─ assets/
│  ├─ images/              # Fondos e imágenes de cabecera
│  └─ styles/
│     └─ typography.css    # Tipografía Poppins con todos los pesos
│
├─ components/
│  ├─ Header.vue           # Cabecera con imagen de fondo y superposición
│  ├─ Navigation.vue       # Menú de navegación principal
│  ├─ Typography/
│  │  ├─ Title.vue         # Título principal (72px, SemiBold, blanco)
│  │  ├─ Subtitle.vue      # Subtítulo (20px, regular, color primario)
│  │  ├─ Text.vue          # Texto base o descripción
│  │  └─ TypographyH3.vue  # Texto secundario (16px, SemiBold)
│  └─ Section.vue          # Componente contenedor reutilizable
│
├─ pages/
│  ├─ report/
│  │  ├─ summary.vue       # Resumen Ejecutivo
│  │  ├─ consensus.vue     # Consenso de Voces
│  │  └─ insights.vue      # Fortalezas y Oportunidades
│
├─ router/
│  └─ index.js             # Configuración de Vue Router
│
├─ App.vue
└─ main.js

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
