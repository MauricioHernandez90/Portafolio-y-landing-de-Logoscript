# Logoscript Portfolio - React

Portafolio emocionante con animación de presión creativa.

## Secuencia de Intro
1. Fade in logo (1.2s) + contemplación 2s
2. Barra = presión: fondo se ilumina + temblor progresivo 0->12px
3. Explosión en 1200 partículas (canvas)
4. Bombilla centrada 5.5s, sin rayos, solo glow + filamento tembloroso a punto de fundirse
5. Transición al sitio

## Instalación
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Estructura
- src/components/Intro.jsx -> animación completa
- src/assets/logo-full.png -> tu logo transparente real (L blanca + S amarilla)
- src/assets/logo-icon.png -> solo icono

Sube a Vercel: conecta el repo, hace build automático.

Para agregar tus 2 proyectos reales, edita src/App.jsx en la sección Work.

## Secciones pendientes de contenido

Las siguientes secciones se eliminaron del sitio porque aún no tienen contenido real. Documentadas aquí para no olvidarlas:

- **Work / Portafolio**: eliminada el 10 de octubre de 2026. Se reactivará cuando haya al menos 2-3 proyectos reales terminados y con permiso de mostrarse. Los estilos `.work`, `.grid`, `.card`, `.mock` y `.badge` siguen en App.css listos para reactivarse.
- **Testimonios**: pendiente hasta tener primeros clientes que den feedback.
- **Blog / Recursos**: opcional, futuro. Contenido educativo para posicionamiento SEO.
