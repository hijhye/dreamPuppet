// 수정: 전체 코드 리팩토링 및 성능 개선
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  /* ======================================
   * 인트로 애니메이션 스크립트
   * ====================================== */
  const introSection = document.getElementById("intro");

  if (localStorage.getItem("introSeen") === "true") {
    if (introSection) {
      introSection.style.display = "none";
    }
    document.body.style.overflow = "auto";
  } else {
    const skipBtn = document.querySelector(".skipBtn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        localStorage.setItem("introSeen", "true");
        if (introSection) {
          introSection.style.transition = "opacity 0.5s ease";
          introSection.style.opacity = "0";
          document.body.style.overflow = "auto";
          setTimeout(() => {
            introSection.style.display = "none";
          }, 500);
        }
      });
    }

    function createParticles() {
      const particleCount = 50;
      if (!introSection) return;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 3 + "s";
        particle.style.animationDuration = Math.random() * 3 + 2 + "s";
        introSection.appendChild(particle);
      }
    }

    const words = document.querySelectorAll(".word");
    const typingSection = document.querySelector(".typing-section");
    const typingText = document.querySelector(".typing-text");
    const loadingProgress = document.querySelector(".loading-progress");

    if (
      words.length &&
      typingSection &&
      typingText &&
      loadingProgress &&
      introSection
    ) {
      let currentWordIndex = 0;
      const wordDuration = 1300;

      function showWord(index) {
        if (index >= words.length) {
          setTimeout(startTyping, 300);
          return;
        }

        const word = words[index];
        word.classList.add("show");
        loadingProgress.style.width = ((index + 1) / words.length) * 50 + "%";

        setTimeout(() => {
          if (index < words.length - 1) {
            word.classList.remove("show");
            word.classList.add("hide");
          }
          showWord(index + 1);
        }, wordDuration);
      }

      function startTyping() {
        typingSection.classList.add("show");
        const text = "이야기로 사람들의 마음을 움직이다";
        let charIndex = 0;

        const cursor = document.createElement("span");
        cursor.className = "cursor";
        typingText.appendChild(cursor);

        function typeChar() {
          if (charIndex < text.length) {
            const char = text[charIndex];
            const textNode = document.createTextNode(char);
            typingText.insertBefore(textNode, cursor);
            charIndex++;

            const progress = 50 + (charIndex / text.length) * 50;
            loadingProgress.style.width = progress + "%";

            setTimeout(typeChar, 80);
          } else {
            setTimeout(() => {
              localStorage.setItem("introSeen", "true");
              introSection.style.transition = "opacity 0.5s ease";
              introSection.style.opacity = "0";
              document.body.style.overflow = "auto";

              setTimeout(() => {
                introSection.style.display = "none";
              }, 500);
            }, 2000);
          }
        }

        setTimeout(typeChar, 300);
      }

      setTimeout(() => {
        document.body.style.overflow = "hidden";
        createParticles();
        showWord(0);
      }, 500);
    } else {
      if (introSection) introSection.style.display = "none";
    }
  }

  /* ======================================
   * Visual Section Animation
   * ====================================== */
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#visual",
      start: "top top",
      end: "+=2000",
      scrub: 5,
      markers: false,
      pin: true,
    },
  });

  tl.to(
    "#visual .circle",
    { width: "3000px", height: "3000px", borderRadius: 0 },
    0
  )
    .to("#visual .inner", { borderRadius: 0 }, 0.1)
    .to("#visual h2", { width: "100%" }, 0)
    .to("#visual .keyword01", { left: "-50px", fontSize: "120px" }, 0)
    .to("#visual .keyword02", { right: "-100px", fontSize: "120px" }, 0)
    .to(
      "#visual li:nth-child(1)",
      { transform: "translateY(-60%)", ease: "elastic.out(1, 0.5)" },
      1
    )
    .to(
      "#visual li:nth-child(2)",
      { transform: "translateY(-40%)", ease: "elastic.out(1, 0.5)" },
      1.2
    )
    .to(
      "#visual li:nth-child(3)",
      { transform: "translateY(-50%)", ease: "elastic.out(1, 0.5)" },
      1
    )
    .to(
      "#visual li:nth-child(4)",
      { transform: "translateY(-30%)", ease: "elastic.out(1, 0.5)" },
      1.3
    )
    .to(
      "#visual li:nth-child(5)",
      { transform: "translateY(-50%)", ease: "elastic.out(1, 0.5)" },
      1
    )
    .to(
      "#visual li:nth-child(6)",
      { transform: "translateY(-20%)", ease: "elastic.out(1, 0.5)" },
      1.5
    )
    .to(
      "#visual li:nth-child(7)",
      { transform: "translateY(-50%)", ease: "elastic.out(1, 0.5)" },
      1
    )
    .to(
      "#visual li:nth-child(8)",
      { transform: "translateY(-30%)", ease: "elastic.out(1, 0.5)" },
      1.3
    );

  /* ======================================
   * Our Stage Section - Fan Animation (부채 펼치기)
   * ====================================== */
  const stageSection = document.querySelector(".our-design-section");
  const stageCards = document.querySelectorAll(".stage-card");

  if (stageSection && stageCards.length > 0) {
    // 카드를 초기에 모두 중앙에 겹쳐놓기
    gsap.set(stageCards, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 0,
    });

    // 스크롤 트리거로 부채처럼 펼치기
    const stageTl = gsap.timeline({
      scrollTrigger: {
        trigger: stageSection,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        markers: false,
      },
    });

    // 첫 번째 카드 (왼쪽)
    stageTl.to(
      stageCards[0],
      {
        x: -320,
        y: 30,
        rotation: -12,
        opacity: 1,
        ease: "power2.out",
      },
      0
    );

    // 두 번째 카드 (중앙)
    stageTl.to(
      stageCards[1],
      {
        x: 0,
        y: -20,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
      },
      0.1
    );

    // 세 번째 카드 (오른쪽)
    stageTl.to(
      stageCards[2],
      {
        x: 320,
        y: 30,
        rotation: 12,
        opacity: 1,
        ease: "power2.out",
      },
      0.2
    );

    // 호버 효과를 위한 개별 애니메이션
    stageCards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  /* ======================================
   * Header Scroll Behavior
   * ====================================== */
  const header = document.getElementById("main-header");
  let lastScrollTop = 0;
  const scrollThreshold = 10;
  const hideThreshold = 5;

  // 개선: header가 있을 때만 스크롤 이벤트 리스너 등록
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
   * Online Theater Carousel
   * ====================================== */
  let rotation = 0;
  let activeIndex = 0;
  let isAnimating = false;
  let autoRotateInterval;

  const contents = [
    {
      id: 1,
      title: "인형극 축제",
      description: "경기인형극제 in 수원' 오는 15일부터 28일까지 열려...",
      imageUrl:
        "https://i.pinimg.com/736x/6a/b4/f7/6ab4f7e02407785821c55754d88dc92f.jpg",
    },
    {
      id: 2,
      title: "무대 공연에 사랑스러운 아이들 일러스트",
      description: "무대 공연에 사랑스러운 아이들 PNG 일러스트 를 제공하여...",
      imageUrl:
        "https://i.pinimg.com/736x/c6/6c/d7/c66cd794111b9852a94a2e5ca60d32a1.jpg",
    },
    {
      id: 3,
      title: "어린이 무대공연",
      description:
        "극장에서 펼쳐지는 눈부신 무대 퍼포먼스에 놀라움과 설렘을 느끼며",
      imageUrl:
        "https://i.pinimg.com/736x/50/c8/5c/50c85c52a677bcc591d3567b3d84092f.jpg",
    },
    {
      id: 4,
      title: "Kids Stage Show",
      description:
        "극장에서 펼쳐지는 아이들을 위한 환상적인 무대 공연을 만나보세요.",
      imageUrl:
        "https://i.pinimg.com/736x/b0/5e/60/b05e608d1282cf1c4fd40d70c37f77bd.jpg",
    },
    {
      id: 5,
      title: "토이저러스",
      description: "환상적인 공간에서 아이들이 노는 모습을 담았습니다.",
      imageUrl:
        "https://usnewsper.com/wp-content/uploads/2024/07/1b_7Qgs6obOPAz100XHxelEewnUR8KmsM.png",
    },
    {
      id: 6,
      title: "어린이 창작공연",
      description:
        "극장에서 펼쳐지는 아이들을 위한 환상적인 무대 공연을 만나보세요.",
      imageUrl:
        "https://i.pinimg.com/736x/bf/bf/13/bfbf13a4386168d3b27e14d65aa53c4b.jpg",
    },
    {
      id: 7,
      title: "마드리드 극장",
      description: "바이 바이 버디 마드리드 극장에서 펼쳐지다.",
      imageUrl:
        "https://i.pinimg.com/736x/c1/e8/95/c1e895c0c0601ea1843d43df08a19af2.jpg",
    },
    {
      id: 8,
      title: "Shadow play",
      description: "어린이들과 함께 빛과 그림자를 이용한 그림자 인형놀이.",
      imageUrl:
        "https://i.pinimg.com/736x/7a/91/5b/7a915b721dd248b3db1366316dcd6eec.jpg",
    },
  ];

  const contentContainer = document.getElementById("content-container");
  const mainBackground = document.getElementById("main-background");

  if (!contentContainer) {
    console.log("carousel: content-container가 없어 초기화를 건너뜁니다.");
  } else {
    const getItemStyle = (index) => {
      const angle = (360 / contents.length) * index;
      const spacing = 150;
      const currentAngle = angle - rotation;
      const normalizedAngle = ((currentAngle % 360) + 360) % 360;
      const frontness = Math.abs(Math.cos((normalizedAngle * Math.PI) / 180));
      const yPosition = Math.sin((currentAngle * Math.PI) / 180) * spacing;
      const zPosition = Math.cos((currentAngle * Math.PI) / 180) * 200;
      const scale = 0.5 + frontness * 0.5;
      const opacity = 0.5 + frontness * 0.5;
      const zIndex = Math.round(zPosition + 1000);
      return { yPosition, scale, opacity, zIndex };
    };

    const updateCarousel = () => {
      const items = document.querySelectorAll(".carousel-item");
      items.forEach((item, index) => {
        const { yPosition, scale, opacity, zIndex } = getItemStyle(index);
        item.style.transform = `translateY(${yPosition}px) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = zIndex;

        const innerContent = item.querySelector(".item-content");
        if (index === activeIndex) {
          item.classList.add("is-active");
          innerContent.style.filter = "grayscale(0%) blur(0)";
        } else {
          item.classList.remove("is-active");
          innerContent.style.filter = "grayscale(50%) blur(1px)";
        }
      });
    };

    const updateBackground = (isInitialLoad = false) => {
      const activeContent = contents[activeIndex];
      if (!mainBackground) return;

      if (!isInitialLoad) {
        mainBackground.style.opacity = 0;
      }

      setTimeout(
        () => {
          mainBackground.style.backgroundImage = `url('${activeContent.imageUrl}')`;
          mainBackground.style.opacity = 1;
        },
        isInitialLoad ? 0 : 350
      );
    };

    const rotate = (direction) => {
      if (isAnimating) return;
      isAnimating = true;

      const angle = 360 / contents.length;
      rotation += direction * angle;

      let newActiveIndex = Math.round(rotation / angle);
      activeIndex =
        ((newActiveIndex % contents.length) + contents.length) %
        contents.length;

      updateCarousel();
      updateBackground();

      setTimeout(() => {
        isAnimating = false;
      }, 700);
    };

    const init = () => {
      contents.forEach((content) => {
        const item = document.createElement("div");
        item.className = "carousel-item";
        item.innerHTML = `
          <div class="item-content" style="background-image: url('${content.imageUrl}')">
            <div class="item-details">
              <h2 class="item-title">${content.title}</h2>
              <p class="item-description">${content.description}</p>
            </div>
          </div>
        `;
        contentContainer.appendChild(item);
      });

      autoRotateInterval = setInterval(() => rotate(-1), 2000);
      updateCarousel();
      updateBackground(true);
    };

    init();
  }

  /* ======================================
   * Creative Service Tabs
   * ====================================== */
  const tabs = document.querySelectorAll(".service-tab-item");
  const panels = document.querySelectorAll(".service-panel-item");

  if (tabs.length > 0 && panels.length > 0) {
    let currentPanelIndex = 0;
    let inactivityTimer;
    let slideInterval;

    function showPanel(index) {
      if (!tabs[index] || !panels[index]) return;

      tabs.forEach((tab) => tab.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      tabs[index].classList.add("active");
      tabs[index].setAttribute("aria-selected", "true");
      panels[index].classList.add("active");

      currentPanelIndex = index;
    }

    function startAutoSlide() {
      stopAutoSlide();
      slideInterval = setInterval(() => {
        const nextIndex = (currentPanelIndex + 1) % tabs.length;
        showPanel(nextIndex);
      }, 3000);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    // 수정: 성능 개선 - 이벤트 리스너를 한 번만 등록
    function resetInactivityTimer() {
      stopAutoSlide();
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(startAutoSlide, 5000);
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        showPanel(index);
        resetInactivityTimer();
      });

      // 키보드 지원 추가
      tab.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showPanel(index);
          resetInactivityTimer();
        }
      });
    });

    // 수정: 이벤트 리스너를 전역에 한 번만 등록
    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer, {
        passive: true,
      });
    });

    showPanel(0);
    resetInactivityTimer();
  }

  /* ======================================
   * Intersection Observer
   * ====================================== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sectionsToObserve = document.querySelectorAll(
    "section:not(.intro-section)"
  );

  sectionsToObserve.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  /* ======================================
   * To Top Button
   * ====================================== */

  /* ======================================
   * Story Cards Magnetic Effect
   * ====================================== */
  const storyCards = document.querySelectorAll(".story-card");
  const magneticStrength = 0.3;

  storyCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        x: x * magneticStrength,
        y: y * magneticStrength,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });

  /* ======================================
   * Mobile Navigation
   * ====================================== */
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

  if (hamburger && mobileNav && mobileNavLinks.length > 0) {
    function toggleMobileNav() {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("nav-open");

      if (mobileNav.classList.contains("active")) {
        gsap.to(mobileNavLinks, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileNavLinks, {
          opacity: 0,
          x: -50,
          duration: 0.3,
          ease: "power1.in",
        });
      }
    }

    hamburger.addEventListener("click", toggleMobileNav);

    // 키보드 지원 추가
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

  //==================================
  // Footer Scroll Behavior *
  //==================================

  $(".accordion-toggle").on("click", function () {
    $(this).next("ul").slideToggle();
    const indicator = $(this).find(".indicator");
    if (indicator.text() === "+") {
      indicator.text("-");
    } else {
      indicator.text("+");
    }
  });

  let footer = document.querySelector("footer");

  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;

    if (currentScroll + windowHeight >= documentHeight - 10) {
      footer.style.transform = "translateY(0%)";
    } else {
      footer.style.transform = "translateY(90%)";
    }
  });
  loadComponent("#footer", "footer/footer.html");
});
