// ========================================
// 공통 컴포넌트 불러오기
// ========================================
// 사용법: HTML에서 <div data-include="components/header.html"></div>

document.addEventListener("DOMContentLoaded", function () {
  loadComponents();
});

function loadComponents() {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach((element) => {
    const file = element.getAttribute("data-include");

    if (file) {
      fetch(file)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;

          // 현재 페이지 네비게이션 활성화
          highlightCurrentPage();
        })
        .catch((error) => {
          console.error("컴포넌트 로딩 오류:", error);
          element.innerHTML = "<p>컴포넌트를 불러올 수 없습니다.</p>";
        });
    }
  });
}

// ========================================
// 현재 페이지 네비게이션 강조
// ========================================
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (
      currentPath === linkPath ||
      (currentPath.includes(linkPath) && linkPath !== "/")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ========================================
// 컴포넌트 새로고침
// ========================================
function refreshComponents() {
  loadComponents();
}

// ========================================
// 동적 컴포넌트 로드 함수
// ========================================
async function loadComponent(selector, componentPath) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`요소를 찾을 수 없습니다: ${selector}`);
    return;
  }

  try {
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    element.innerHTML = html;

    return true;
  } catch (error) {
    console.error("컴포넌트 로딩 실패:", error);
    return false;
  }
}

// ========================================
// 사용 예시
// ========================================
/*
HTML에서 사용:
<div data-include="components/header.html"></div>
<div data-include="components/footer.html"></div>

JavaScript에서 동적 로드:
loadComponent('#header', 'components/header.html');
loadComponent('#footer', 'components/footer.html');
*/
