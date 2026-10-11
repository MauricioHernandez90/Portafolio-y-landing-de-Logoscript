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
