$(function () {
  // .con02
  $(".con02 .menu li").on("mouseenter", function () {
    let i = $(this).index();
    $(".con02 .title li").removeClass("look");
    $(".con02 .title li").eq(i).addClass("look");
  });

  // .con03
  $(function () {
    $(".con03 ul").simplyScroll({
      speed: 1.5,
      pauseOnHover: true,
      pauseOnTouch: false,
    });
  });
});

// .con04
gsap.registerPlugin(ScrollTrigger);
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".con04",
      start: "top 50%",
      markers: false,
    },
  })
  .fromTo(
    ".con04 h3:nth-child(1) p",
    { y: "150%", opacity: 0 },
    { y: 0, opacity: 1 },
    0
  )
  .fromTo(
    ".con04 h3:nth-child(2) p",
    { y: "150%", opacity: 0 },
    { y: 0, opacity: 1 },
    0.5
  );

// con01
let values = document.querySelectorAll(".con01 .values div");
let text = document.querySelectorAll(".con01 ul li");
values.forEach((i, index) => {
  i.addEventListener("mouseover", function () {
    text.forEach(function (i, index) {
      gsap.to(i, { opacity: 0, duration: 1.5 });
      i.classList.remove("up");
    });
    gsap.to(text[index], { opacity: 1, duration: 1.5 });
    text[index].classList.add("up");

    gsap
      .timeline()
      .fromTo(".con01 li h3", { rotateX: "250deg" }, { rotateX: "360deg" }, 0.3)
      .fromTo(
        ".con01 li .second",
        { rotateX: "-120deg" },
        { rotateX: "0deg" },
        0.3
      );
  });
});

// con02
gsap
  .timeline()
  .fromTo(".con02 .title h3", { x: "150%" }, { x: "0%" }, 0.5)
  .fromTo(".con02 .title p", { x: "150%" }, { x: "0%" }, 1);

let menu = document.querySelectorAll(".con02 .menu li");
let bg = document.querySelectorAll(".con02 .bg li");
console.log(menu);

menu.forEach((i, index) => {
  i.addEventListener("mouseover", function () {
    menu.forEach(function (i, index) {
      i.classList.remove("look");
    });
    menu[index].classList.add("look");
    gsap
      .timeline()
      .fromTo(".con02 .title h3", { x: "150%" }, { x: "0%" }, 0)
      .fromTo(".con02 .title p", { x: "150%" }, { x: "0%" }, 0.3);

    bg.forEach((i) => {
      gsap.killTweensOf(i);
      i.style.display = "none";
    });

    gsap.fromTo(
      bg[index],
      { opacity: 0 },
      { opacity: 1, duration: 1.3, display: "block" }
    );
  });
});

// 플로팅
let float = document.querySelector("#floating .floatFix");
let goTop = document.querySelector("#floating .top");
let inquery = document.querySelector("#floating .inquery");
let close = document.querySelector(".inquery i");

float.addEventListener("mouseenter", () => {
  gsap.timeline().to("#floating .top", { top: "-35%" });
});

float.addEventListener("mouseleave", (e) => {
  check = e.relatedTarget;
  if (goTop === check) {
    return;
  }
  gsap.timeline().to("#floating .top", { top: "50%" });
});
goTop.addEventListener("mouseleave", (e) => {
  check = e.relatedTarget;
  if (float === check) {
    return;
  }
  gsap.timeline().to("#floating .top", { top: "50%" });
});

float.addEventListener("click", () => {
  gsap.timeline().to(inquery, { top: "-500px", display: "block", opacity: 1 });
});
close.addEventListener("click", () => {
  gsap.timeline().to(inquery, { top: 0, display: "none", opacity: 0 });
});
$(goTop).on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 300);
});
