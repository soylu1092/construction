const menuToggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("site-menu");

if (menuToggle && menu) {
  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedOutside =
      !menu.contains(event.target) && !menuToggle.contains(event.target);
    if (document.body.classList.contains("nav-open") && clickedOutside) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}

const projectSliders = document.querySelectorAll(".project-slider");
const tabletSliderQuery = window.matchMedia("(min-width: 681px) and (max-width: 980px)");

const setFixedTabletSliderHeight = (slider, slides) => {
  const isFeaturedTablet =
    tabletSliderQuery.matches && slider.closest(".featured-projects");

  if (!isFeaturedTablet || !slides.length) {
    slider.style.removeProperty("height");
    return;
  }

  const applyHeight = () => {
    const width = slider.clientWidth;
    if (!width) {
      return;
    }

    let maxHeight = 0;
    slides.forEach((slide) => {
      const { naturalWidth, naturalHeight } = slide;
      if (!naturalWidth || !naturalHeight) return;
      const currentHeight = Math.round((width * naturalHeight) / naturalWidth);
      if (currentHeight > maxHeight) {
        maxHeight = currentHeight;
      }
    });

    if (maxHeight > 0) {
      slider.style.height = `${maxHeight}px`;
    }
  };

  applyHeight();

  slides.forEach((slide) => {
    if (!slide.complete) {
      slide.addEventListener("load", applyHeight, { once: true });
    }
  });
};

projectSliders.forEach((slider) => {
  const slides = slider.querySelectorAll(".project-slide");
  const interval = Number(slider.dataset.interval) || 1000;

  if (slides.length < 2) {
    return;
  }

  let currentIndex = 0;
  setFixedTabletSliderHeight(slider, slides);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.remove("is-active");
    currentIndex = nextIndex;
    slides[currentIndex].classList.add("is-active");
  };

  let timer = setInterval(nextSlide, interval);

  slider.addEventListener("mouseenter", () => {
    clearInterval(timer);
  });

  slider.addEventListener("mouseleave", () => {
    timer = setInterval(nextSlide, interval);
  });

  window.addEventListener("resize", () => {
    setFixedTabletSliderHeight(slider, slides);
  });

  tabletSliderQuery.addEventListener("change", () => {
    setFixedTabletSliderHeight(slider, slides);
  });
});
