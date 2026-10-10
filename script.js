/* =========================================================
   NUEVO TELECLUB VALVERDE — script.js
   Vanilla JS. Sin dependencias externas.
   ========================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mqDesktop = window.matchMedia("(min-width: 768px)");

  /* -----------------------------------------------------
     1) NAVBAR — glassmorphism al hacer scroll
  ----------------------------------------------------- */
  var navbar = document.getElementById("navbar");
  function updateNavbarBg() {
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  updateNavbarBg();
  window.addEventListener("scroll", updateNavbarBg, { passive: true });

  /* -----------------------------------------------------
     2) MENÚ HAMBURGUESA (móvil) — apertura/cierre fluidos
  ----------------------------------------------------- */
  var burgerBtn = document.getElementById("burgerBtn");
  var mainNav = document.getElementById("mainNav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
  var menuOpen = false;

  function openMenu() {
    menuOpen = true;
    burgerBtn.classList.add("is-open");
    mainNav.classList.add("is-open");
    burgerBtn.setAttribute("aria-expanded", "true");
    burgerBtn.setAttribute("aria-label", "Cerrar menú");
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    menuOpen = false;
    burgerBtn.classList.remove("is-open");
    mainNav.classList.remove("is-open");
    burgerBtn.setAttribute("aria-expanded", "false");
    burgerBtn.setAttribute("aria-label", "Abrir menú");
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  }

  burgerBtn.addEventListener("click", function () {
    if (menuOpen) { closeMenu(); } else { openMenu(); }
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (menuOpen) { closeMenu(); }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuOpen) { closeMenu(); }
  });

  // si la ventana pasa a tamaño de escritorio con el menú abierto, lo cerramos
  function handleBreakpointChange(e) {
    if (e.matches && menuOpen) { closeMenu(); }
  }
  if (mqDesktop.addEventListener) {
    mqDesktop.addEventListener("change", handleBreakpointChange);
  } else if (mqDesktop.addListener) {
    mqDesktop.addListener(handleBreakpointChange);
  }

  /* -----------------------------------------------------
     3) REVEAL ON SCROLL — Intersection Observer
  ----------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* -----------------------------------------------------
     4) PARALLAX DEL HERO
  ----------------------------------------------------- */
  var heroSection = document.getElementById("hero");
  var heroParallax = document.getElementById("heroParallax");

  if (heroSection && heroParallax) {
    var parallaxTicking = false;

    var applyParallax = function () {
      parallaxTicking = false;
      if (prefersReducedMotion) return;
      var rect = heroSection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var offset = window.scrollY * 0.28;
      heroParallax.style.transform = "translate3d(0, " + offset + "px, 0)";
    };
    var onScrollParallax = function () {
      if (!parallaxTicking) {
        parallaxTicking = true;
        window.requestAnimationFrame(applyParallax);
      }
    };
    applyParallax();
    window.addEventListener("scroll", onScrollParallax, { passive: true });
    window.addEventListener("resize", onScrollParallax, { passive: true });
  }

  /* -----------------------------------------------------
     5) RIPPLE — micro-interacción sutil en botones
  ----------------------------------------------------- */
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (prefersReducedMotion) return;
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height);
      ripple.className = "btn__ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  /* -----------------------------------------------------
     6) CARRUSEL DE TESTIMONIOS
     - autoplay continuo
     - swipe táctil nativo (scroll-snap)
     - arrastre con ratón en escritorio
     - pausa con el ratón encima
     - indicadores tipo "dial de sintonía"
  ----------------------------------------------------- */
  var carousel = document.getElementById("carousel");
  var track = document.getElementById("carouselTrack");
  var dial = document.getElementById("carouselDial");

  if (carousel && track && dial) {
    var cards = Array.prototype.slice.call(track.children);

    var index = 0;
    var autoplayTimer = null;
    var isPointerDown = false;
    var startX = 0;
    var startScroll = 0;

    cards.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Ir al testimonio " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); resetAutoplay(); });
      dial.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dial.children);

    var cardOffset = function (i) {
      var card = cards[i];
      return card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2;
    };

    var updateDots = function () {
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === index); });
    };

    var goTo = function (i) {
      index = (i + cards.length) % cards.length;
      track.scrollTo({ left: cardOffset(index), behavior: prefersReducedMotion ? "auto" : "smooth" });
      updateDots();
    };

    var next = function () { goTo(index + 1); };

    var startAutoplay = function () {
      if (prefersReducedMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(next, 3800);
    };
    var stopAutoplay = function () {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    };
    var resetAutoplay = function () { startAutoplay(); };

    var scrollTimeout;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var center = track.scrollLeft + carousel.clientWidth / 2;
        var closest = 0;
        var min = Infinity;
        cards.forEach(function (card, i) {
          var cCenter = card.offsetLeft + card.offsetWidth / 2;
          var d = Math.abs(cCenter - center);
          if (d < min) { min = d; closest = i; }
        });
        index = closest;
        updateDots();
      }, 100);
    }, { passive: true });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // arrastre con ratón en escritorio (el táctil usa el scroll nativo + snap)
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") { stopAutoplay(); return; }
      isPointerDown = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("is-dragging");
      stopAutoplay();
    });
    window.addEventListener("pointermove", function (e) {
      if (!isPointerDown) return;
      var dx = e.clientX - startX;
      track.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!isPointerDown) return;
      isPointerDown = false;
      track.classList.remove("is-dragging");
      resetAutoplay();
    });
    track.addEventListener("touchend", resetAutoplay, { passive: true });

    window.addEventListener("load", function () {
      goTo(0);
      startAutoplay();
    });
    window.addEventListener("resize", function () { goTo(index); });
  }

})();
