# Nuevo Teleclub Valverde

**Web de un bar de pueblo, diseñada primero para el móvil y hecha sin frameworks.**
HTML, CSS y JavaScript puros: animaciones cuidadas, rendimiento y accesibilidad como prioridad.

[![Ver demo en vivo](https://img.shields.io/badge/Ver%20demo%20en%20vivo-teleclub.netlify.app-6B7A2B?style=for-the-badge&logo=netlify&logoColor=white)](https://teleclub.netlify.app/)

![HTML5](https://img.shields.io/badge/HTML5-111111?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-111111?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-111111?style=flat&logo=javascript&logoColor=white)
![Mobile First](https://img.shields.io/badge/Mobile%20First-6B7A2B?style=flat)
![Sin dependencias](https://img.shields.io/badge/Dependencias-0-6B7A2B?style=flat)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-111111?style=flat&logo=netlify&logoColor=white)

> **TL;DR (English):** a three-page, mobile-first website for a real bar in Extremadura, Spain. Built with vanilla HTML/CSS/JS only: cinematic hero with parallax, glassmorphism navbar, accessible hamburger menu, auto-scrolling photo gallery (pure CSS), swipeable testimonials carousel and a full menu page. Live demo: [teleclub.netlify.app](https://teleclub.netlify.app/).

---

## Vista previa

![Hero en escritorio](docs/screenshots/01-hero-escritorio.jpg)

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/m1-hero-movil.jpg" width="230" alt="Hero en móvil"><br><sub>Hero (móvil)</sub></td>
    <td align="center"><img src="docs/screenshots/m2-menu-movil.jpg" width="230" alt="Menú hamburguesa en móvil"><br><sub>Menú hamburguesa</sub></td>
    <td align="center"><img src="docs/screenshots/m3-testimonios-movil.jpg" width="230" alt="Carrusel de testimonios en móvil"><br><sub>Testimonios</sub></td>
    <td align="center"><img src="docs/screenshots/m4-carta-movil.jpg" width="230" alt="Página de carta en móvil"><br><sub>Carta</sub></td>
  </tr>
</table>

| Galería | Carta | Sobre Nosotros |
|:---:|:---:|:---:|
| ![Galería](docs/screenshots/02-galeria-escritorio.jpg) | ![Carta](docs/screenshots/04-carta-escritorio.jpg) | ![Sobre Nosotros](docs/screenshots/05-sobre-nosotros-escritorio.jpg) |

---

## Sobre el proyecto

El Nuevo Teleclub Valverde es un bar de Valverde de Burguillos (Badajoz). Quería una web que transmitiera cercanía y buen gusto, sin parecer la típica web de restaurante, y que funcionara sobre todo en el móvil, que es desde donde se va a abrir casi siempre.

**El reto:** conseguir un resultado premium (inspirado en Apple, Vercel, Linear y Airbnb) con una paleta de solo tres colores y **sin usar ninguna librería ni framework**.

**Lo que hice:**
- Diseñé la interfaz y la identidad visual a partir del logo y las fotos reales del local.
- Desarrollé tres páginas (inicio, carta y sobre nosotros) con un único `style.css` y un único `script.js`.
- Preparé y optimicé las imágenes: quité el fondo del logo y generé una versión distinta del Hero para móvil vertical.
- Lo publiqué en Netlify y lo probé en móviles, tablets y escritorio.

---

## Lo que demuestra este proyecto

| Habilidad | Dónde se ve |
|---|---|
| **Maquetación responsive y Mobile First** | Estilos base para móvil y mejoras con `min-width`; cuadrículas con `minmax(0, 1fr)`; tipografía fluida con `clamp()`; revisado sin desbordamientos en pantallas de 320 px a 2560 px |
| **CSS avanzado** | Grid, flexbox, variables CSS, `backdrop-filter` (glassmorphism), `scroll-snap`, máscaras, animaciones con `@keyframes` y propiedades `env(safe-area-inset-*)` |
| **JavaScript puro** | `IntersectionObserver`, parallax con `requestAnimationFrame`, carrusel con autoplay, swipe táctil y arrastre con ratón, menú móvil accesible (`aria-expanded`, cierre con Escape, bloqueo de scroll) |
| **Rendimiento** | Animaciones solo con `transform` y `opacity`, `loading="lazy"`, imágenes optimizadas, `<picture>` con recorte específico para móvil, cero dependencias |
| **Accesibilidad** | HTML semántico, `aria-expanded` y `aria-label` en controles, `:focus-visible`, soporte de `prefers-reduced-motion` |
| **SEO** | Título y descripción por página, Open Graph, textos `alt` |
| **Criterio de diseño** | Sistema de diseño con variables, jerarquía tipográfica (Fraunces + Manrope), contraste y legibilidad sobre fotografía |
| **Depuración** | Detecté y corrigí fallos reales de móvil (ver más abajo) |

---

## Funcionalidades

- **Hero cinematográfico:** zoom lento (efecto Ken Burns), parallax, viñeteado y degradados para que el texto se lea siempre, y título que aparece palabra por palabra.
- **Navbar** transparente que pasa a efecto cristal al hacer scroll, y **menú hamburguesa** con animación en móvil.
- **Galería de 3 columnas** que se desplaza sola en bucle infinito, solo con CSS, y se pausa al pasar el ratón.
- **Carrusel de testimonios** con tarjetas de cristal, autoplay, swipe, arrastre con ratón, pausa al hover e indicadores.
- **Página de Carta** con 32 platos agrupados por secciones y aparición escalonada al hacer scroll.
- **Página Sobre Nosotros** con historia, valores, galería y contacto.
- **Microinteracciones:** reveal al hacer scroll, efecto ripple en botones, elevación y zoom suave en tarjetas e imágenes.
- **Enlaces de acción reales:** botón de llamada (`tel:`) e Instagram del bar.

---

## Decisiones técnicas y aprendizajes

**1. Parallax y Ken Burns en capas separadas.**
Los dos efectos usan `transform`, y si van en el mismo elemento se pisan. Separé el parallax (que mueve el contenedor desde JS) del zoom (animación CSS sobre la imagen) y dejé el viñeteado y los degradados en capas fijas para que el contraste no cambie al moverse.

**2. Bucle infinito de la galería sin JavaScript.**
Cada columna contiene sus fotos duplicadas y se anima de `translateY(0)` a `translateY(-50%)`, de modo que el final del bucle coincide con el principio y no se nota el salto.

**3. Arte dirigido en el Hero.**
Una foto horizontal recortada a pantalla de móvil pierde el sujeto principal. Con `<picture>` y `max-aspect-ratio` el móvil en vertical carga un recorte propio, centrado en la puerta y el logo, que además pesa menos.

**4. Bugs de móvil que encontré y arreglé.**
- *Cuadrículas que reventaban el ancho:* `1fr` no tiene mínimo real, así que el contenido empujaba las columnas fuera de la pantalla. Lo solucioné con `minmax(0, 1fr)`.
- *Título que se salía del móvil:* una frase con espacios no separables (`&nbsp;`) no podía partir línea. La dividí en palabras independientes manteniendo la animación.
- *Logo con fondo:* el recorte automático dejaba un rectángulo gris, porque el fondo de la foto no era blanco puro. Lo rehíce aislando el contorno del logo para obtener un PNG con transparencia limpia.

**5. Legibilidad sobre fotografía.**
Con una foto clara, el texto necesita varias capas: oscurecimiento general, degradado inferior, refuerzo lateral en pantallas anchas y sombra de texto sutil.

---

## Tecnologías

- HTML5 semántico
- CSS3 (variables, grid, flexbox, `clamp()`, `backdrop-filter`, `scroll-snap`)
- JavaScript puro (Vanilla)
- Google Fonts: Fraunces y Manrope (única petición externa)
- Netlify para el despliegue

---

## Estructura del proyecto

```
teleclub/
├── index.html              # Inicio
├── carta.html              # Carta
├── sobre-nosotros.html     # Sobre Nosotros
├── style.css               # Estilos (sistema de diseño + componentes)
├── script.js               # Interacciones
├── README.md
├── docs/
│   └── screenshots/        # Capturas usadas en este README
└── img/
    ├── logo.png
    ├── hero.jpeg
    ├── hero-mobile.jpg
    ├── interior-1.jpg
    ├── interior-2.jpg
    ├── interior-3.jpg
    └── exterior-2.jpg
```

---

## Ejecutarlo en local

No necesita instalación ni compilación. Basta con abrir `index.html`, o servirlo en local:

```bash
git clone https://github.com/<tu-usuario>/<tu-repositorio>.git
cd <tu-repositorio>
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

---

## Despliegue

La web está publicada en Netlify: **[teleclub.netlify.app](https://teleclub.netlify.app/)**.
Al ser un sitio estático, basta con subir la carpeta del proyecto, sin configuración adicional.

---

## Próximas mejoras

- Completar la carta con bebidas, desayunos y postres.
- Sustituir los testimonios de ejemplo por reseñas reales con foto.
- Añadir horarios y un mapa de ubicación.
- Optimizar las imágenes a WebP/AVIF y generar varios tamaños con `srcset`.
- Dominio propio.

> **Nota:** los comentarios del carrusel de testimonios son contenido de ejemplo para la maqueta y se sustituirán por opiniones reales de clientes.

---

## ¿Hablamos?

Estoy abierto a oportunidades como desarrollador web (full stack) y también a proyectos para negocios locales que necesiten una web rápida, cuidada y pensada para móvil.

- **LinkedIn:** [tu-perfil](www.linkedin.com/in/marcolunadev)
- **Email:** marcoslunasantos23@gmail.com

---

Desarrollado por **Marco**.
© 2026 Nuevo Teleclub Valverde. Todos los derechos reservados.
