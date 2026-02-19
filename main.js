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

projectSliders.forEach((slider) => {
  const slides = slider.querySelectorAll(".project-slide");
  const interval = Number(slider.dataset.interval) || 1000;

  if (slides.length < 2) {
    return;
  }

  let currentIndex = 0;

  const nextSlide = () => {
    slides[currentIndex].classList.remove("is-active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("is-active");
  };

  let timer = setInterval(nextSlide, interval);

  slider.addEventListener("mouseenter", () => {
    clearInterval(timer);
  });

  slider.addEventListener("mouseleave", () => {
    timer = setInterval(nextSlide, interval);
  });
});
