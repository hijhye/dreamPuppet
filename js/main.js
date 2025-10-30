// [오류 수정] 모든 코드는 HTML이 로드된 후 실행되도록 DOMContentLoaded 안에 배치합니다.
document.addEventListener("DOMContentLoaded", () => {
  // [개선] 필요한 GSAP 플러그인만 등록합니다.
  gsap.registerPlugin(ScrollToPlugin);

  /* * ======================================
   * 인트로 애니메이션 스크립트
   * ======================================
   */

  // 파티클 생성
  function createParticles() {
    const particleCount = 50;
    const introSection = document.getElementById("intro"); // body 대신 intro 섹션에 추가
    if (!introSection) return;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 3 + "s";
      particle.style.animationDuration = Math.random() * 3 + 2 + "s";
      introSection.appendChild(particle); // body -> introSection
    }
  }

  createParticles();

  // 단어 애니메이션
  const words = document.querySelectorAll(".word");
  const typingSection = document.querySelector(".typing-section");
  const typingText = document.querySelector(".typing-text");
  const loadingProgress = document.querySelector(".loading-progress");
  const introSection = document.getElementById("intro"); // 인트로 섹션 선택

  // [오류 수정] 인트로 요소가 없을 경우 스크립트 중단 (메인 페이지가 아닐 경우)
  if (
    !words.length ||
    !typingSection ||
    !typingText ||
    !loadingProgress ||
    !introSection
  ) {
    console.log("인트로 요소가 없어 스크립트를 스킵합니다.");
    // 인트로 섹션이 없으면 바로 메인 콘텐츠가 보이도록 함
    if (introSection) introSection.style.display = "none";
  } else {
    let currentWordIndex = 0;
    const wordDuration = 1300;

    function showWord(index) {
      if (index >= words.length) {
        setTimeout(startTyping, 300);
        return;
      }

      const word = words[index];
      word.classList.add("show");

      // 로딩 바 업데이트
      loadingProgress.style.width = ((index + 1) / words.length) * 50 + "%";

      setTimeout(() => {
        if (index < words.length - 1) {
          word.classList.remove("show");
          word.classList.add("hide");
        }
        showWord(index + 1);
      }, wordDuration);
    }

    // 타이핑 효과
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

          // 로딩 바 업데이트
          const progress = 50 + (charIndex / text.length) * 50;
          loadingProgress.style.width = progress + "%";

          setTimeout(typeChar, 80);
        } else {
          // [오류 수정] 페이지 새로고침(window.location.href) 대신
          // 인트로 섹션을 숨기는 로직으로 변경
          setTimeout(() => {
            introSection.style.transition = "opacity 0.5s ease";
            introSection.style.opacity = "0";

            // body 스크롤을 다시 활성화
            document.body.style.overflow = "auto";

            setTimeout(() => {
              introSection.style.display = "none";
              console.log("인트로 완료!");
            }, 500); // 0.5초 뒤에 DOM에서 제거
          }, 2000);
        }
      }

      setTimeout(typeChar, 300);
    }

    // 시작
    setTimeout(() => {
      // 인트로 시작 시 body 스크롤을 막음
      document.body.style.overflow = "hidden";
      showWord(0);
    }, 500);
  } // --- End of Intro Script ---

  /* --- 비디오 속도 조절 --- */
  var video = document.getElementById("mySlowVideo");
  if (video) {
    // 비디오가 존재하는지 확인
    video.playbackRate = 0.4;
  }

  /* --- Online Theater Section 슬라이더 스크립트 --- */
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".btn-prev");
  const nextBtn = document.querySelector(".btn-next");
  const indicatorsContainer = document.querySelector(".slider-indicators");

  // 슬라이더 요소가 모두 존재하는지 확인
  if (
    sliderWrapper &&
    slides.length > 0 &&
    prevBtn &&
    nextBtn &&
    indicatorsContainer
  ) {
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // 1. 인디케이터(점) 생성
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("indicator-dot");
      dot.dataset.index = i;
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        goToSlide(index);
      });
      indicatorsContainer.appendChild(dot);
    }

    const indicators = document.querySelectorAll(".indicator-dot");

    // 2. 특정 슬라이드로 이동하는 함수
    function goToSlide(slideIndex) {
      if (slideIndex < 0) {
        slideIndex = slideCount - 1;
      } else if (slideIndex >= slideCount) {
        slideIndex = 0;
      }
      sliderWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
      currentSlide = slideIndex;
      indicators.forEach((dot) => dot.classList.remove("active"));
      indicators[currentSlide].classList.add("active");
      resetAutoPlay();
    }

    // 3. 버튼 클릭 이벤트
    prevBtn.addEventListener("click", () => {
      goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener("click", () => {
      goToSlide(currentSlide + 1);
    });

    // 4. 자동 재생 기능
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    // 5. 자동 재생 리셋 기능
    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    // 6. 초기화
    goToSlide(0);
    startAutoPlay();
  } // --- End of Slider Script ---

  /* --- Creative Service Section 탭(Tab) 기능 구현 (자동 슬라이드 포함) --- */

  const tabs = document.querySelectorAll(".service-tab-item");
  const panels = document.querySelectorAll(".service-panel-item");

  // 이 섹션의 요소가 모두 존재하는지 확인
  if (tabs.length > 0 && panels.length > 0) {
    let currentPanelIndex = 0; // 현재 활성화된 탭의 '인덱스' (0, 1, 2...)
    let inactivityTimer; // 사용자가 멈췄는지 감지하는 타이머
    let slideInterval; // 자동 슬라이드 실행 타이머

    // [오류 수정] data-tab 대신 index를 기반으로 패널을 찾는 함수
    function showPanel(index) {
      // 인덱스에 해당하는 탭이나 패널이 없으면 중단
      if (!tabs[index] || !panels[index]) return;

      // 1. 모든 탭과 패널에서 'active' 제거
      tabs.forEach((tab) => tab.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      // 2. 해당하는 탭과 패널에 'active' 추가
      tabs[index].classList.add("active");
      panels[index].classList.add("active");

      currentPanelIndex = index; // 현재 인덱스 업데이트
    }

    // 자동 슬라이드를 시작하는 함수
    function startAutoSlide() {
      stopAutoSlide(); // 중복 방지를 위해 정지

      slideInterval = setInterval(() => {
        // (현재 인덱스 + 1) % 전체 탭 개수
        // 예: (2 + 1) % 3 = 0 (마지막에서 처음으로 순환)
        const nextIndex = (currentPanelIndex + 1) % tabs.length;
        showPanel(nextIndex);
      }, 3000); // 3초마다 다음 패널로
    }

    // 자동 슬라이드를 멈추는 함수
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    // 사용자 비활성 타이머를 리셋하는 함수 (사용자가 움직일 때 호출됨)
    function resetInactivityTimer() {
      // 1. 진행 중인 자동 슬라이드 멈춤
      stopAutoSlide();

      // 2. 비활성 감지 타이머 초기화
      clearTimeout(inactivityTimer);

      // 3. 5초 후에 자동 슬라이드를 '시작'하도록 예약
      inactivityTimer = setTimeout(startAutoSlide, 5000); // 5초간 움직임 없으면 시작
    }

    // 탭 클릭 이벤트 설정
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        showPanel(index); // 클릭한 탭의 패널 보여주기
        resetInactivityTimer(); // 탭 클릭도 '활동'으로 간주
      });
    });

    // 사용자 활동 감지 이벤트 (마우스, 키보드)
    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // 페이지 로드 시 첫 번째 탭(index 0)을 활성화하고 타이머 시작
    showPanel(0);
    resetInactivityTimer();
  } // --- End of Tab Script ---

  /* --- Intersection Observer를 이용한 섹션 애니메이션 --- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
      }
    });
  }, observerOptions);

  // 인트로 섹션을 제외한 나머지 섹션들만 관찰
  const sectionsToObserve = document.querySelectorAll(
    "section:not(.intro-section)"
  );

  sectionsToObserve.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  /* --- Parallax & To Top Button --- */
  const heroSection = document.querySelector(".hero-section");
  const toTopButton = document.querySelector(".to-top-button");
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;

        // Top 버튼 보이기/숨기기
        if (toTopButton) {
          if (scrolled > 500) {
            toTopButton.classList.add("visible");
          } else {
            toTopButton.classList.remove("visible");
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  if (toTopButton) {
    toTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      // GSAP의 ScrollToPlugin을 사용
      gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
    });
  }

  /* --- New Story Section 마그네틱 효과 --- */
  const storyCards = document.querySelectorAll(".story-card");
  const magneticStrength = 0.3; // 30% 정도만 끌려오도록 설정

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

  /* --- 모바일 네비게이션 --- */
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

  if (hamburger && mobileNav && mobileNavLinks.length > 0) {
    function toggleMobileNav() {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("nav-open"); // body 스크롤 방지용

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

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // 링크를 클릭하면 (페이지 이동이 있든 없든) 메뉴를 닫습니다.
        toggleMobileNav();
      });
    });
  } // --- End of Mobile Nav Script ---
}); // --- END OF MASTER DOMContentLoaded ---
/* Footer Accordion */
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
footer.addEventListener("mouseover", () => {
  footer.style.transform = "translateY(0%)";
});
footer.addEventListener("mouseleave", () => {
  footer.style.transform = "translateY(90%)";
});
