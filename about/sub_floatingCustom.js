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
