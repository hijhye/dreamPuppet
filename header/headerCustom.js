document.addEventListener("DOMContentLoaded", () => {
  /* ======================================
   * Header Scroll Behavior
   * ====================================== */
  const header = document.getElementById("main-header");
  let lastScrollTop = 0;
  const scrollThreshold = 10;
  const hideThreshold = 5;

  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        let currentScroll =
          window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > scrollThreshold) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }

        if (
          Math.abs(currentScroll - lastScrollTop) > hideThreshold &&
          currentScroll > scrollThreshold
        ) {
          if (currentScroll > lastScrollTop) {
            header.classList.add("header-hidden");
          } else {
            header.classList.remove("header-hidden");
          }
        }

        lastScrollTop = currentScroll;
      },
      false
    );
  }

  /* ======================================
   * Mobile Navigation
   * ====================================== */
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

  if (hamburger && mobileNav) {
    function toggleMobileNav() {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("nav-open");

      if (mobileNav.classList.contains("active")) {
        // GSAP is not included here, so we use simple CSS transitions
        gsap.to(".mobile-nav a", {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        });
      } else {
        // GSAP is not included here, so we use simple CSS transitions
        gsap.to(".mobile-nav a", {
          opacity: 0,
          x: -50,
          duration: 0.3,
          stagger: 0.05,
        });
      }
    }

    hamburger.addEventListener("click", toggleMobileNav);

    hamburger.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMobileNav();
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", toggleMobileNav);
    });
  }
});
