const header = document.getElementById("main-header");
let lastScrollTop = 0;
const scrollThreshold = 10;
const hideThreshold = 5;

// 개선: header가 있을 때만 스크롤 이벤트 리스너 등록
if (header) {
  window.addEventListener(
    "scroll",
    function () {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;

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
