document.addEventListener("DOMContentLoaded", () => {
  // --- MENÚ HAMBURGUESA Y NAVEGACIÓN ---
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");

  if (toggle && menu) {
    const toggleMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.toggle("open");
      toggle.classList.toggle("active");
    };

    toggle.addEventListener("click", toggleMenu);

    // Cierra el menú al hacer clic en cualquier parte fuera de él
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open")) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          menu.classList.remove("open");
          toggle.classList.remove("active");
        }
      }
    });
  }

  // --- SUBMENÚS DESPLEGABLES EN MÓVIL ---
  document.querySelectorAll(".has-submenu > a").forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 1050) {
        const li = link.parentElement;
        if (!li.classList.contains("open-mobile")) {
          e.preventDefault();
          document.querySelectorAll(".has-submenu.open-mobile").forEach(x => {
            if (x !== li) x.classList.remove("open-mobile");
          });
          li.classList.add("open-mobile");
        }
      }
    });
  });

  // --- BÚSQUEDA DEL SITIO ---
  const search = document.querySelector("#siteSearch");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase().trim();
      document.querySelectorAll("[data-search]").forEach(card => {
        card.style.display = !q || card.dataset.search.toLowerCase().includes(q) ? "" : "none";
      });
    });
  }

  // --- FILTROS DE GALERÍA ---
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".gallery-item").forEach(item => {
        item.style.display = filter === "all" || item.dataset.category === filter ? "" : "none";
      });
    });
  });

  // --- FORMULARIO DE CONTACTO ---
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const msg = document.querySelector("#formMessage");
      if (msg) {
        msg.textContent = "Mensaje preparado. Conectá este formulario a Formspree, EmailJS o tu backend para recibir envíos reales.";
        msg.classList.add("visible");
      }
    });
  }

  // --- LIGHTBOX PARA LA GALERÍA ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  if (lightbox && lightboxImg && galleryImages.length > 0) {
    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Imagen de la Tierra Media";
        lightbox.classList.add("active");
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }
});