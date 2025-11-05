/*sub_visual*/
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#visual",
    start: "top top",
    end: "+=3000",
    scrub: 2,
    markers: false,
    pin: true,
  },
});
tl.to(
  "#visual .circle",
  {
    width: "3000px",
    height: "3000px",
    borderRadius: 0,
  },
  0
)
  .to(
    "#visual .inner",
    {
      borderRadius: 0,
    },
    0.1
  )
  .to(
    "#visual h2",
    {
      width: "100%",
    },
    0
  )
  .to(
    "#visual .keyword01",
    {
      left: "-50px",
      fontSize: "120px",
    },
    0
  )
  .to(
    "#visual .keyword02",
    {
      right: "-100px",
      fontSize: "120px",
    },
    0
  )
  .to(
    "#visual li:nth-child(1)",
    {
      transform: "translateY(-60%)",
      ease: "elastic.out(1, 0.5)",
    },
    1
  )
  .to(
    "#visual li:nth-child(2)",
    {
      transform: "translateY(-40%)",
      ease: "elastic.out(1, 0.5)",
    },
    1.2
  )
  .to(
    "#visual li:nth-child(3)",
    {
      transform: "translateY(-50%)",
      ease: "elastic.out(1, 0.5)",
    },
    1.1
  )
  .to(
    "#visual li:nth-child(4)",
    {
      transform: "translateY(-30%)",
      ease: "elastic.out(1, 0.5)",
    },
    1.3
  )
  .to(
    "#visual li:nth-child(5)",
    {
      transform: "translateY(-50%)",
      ease: "elastic.out(1, 0.5)",
    },
    1.6
  )
  .to(
    "#visual li:nth-child(6)",
    {
      transform: "translateY(-20%)",
      ease: "elastic.out(1, 0.5)",
    },
    1.5
  )
  .to(
    "#visual li:nth-child(7)",
    {
      transform: "translateY(-50%)",
      ease: "elastic.out(1, 0.5)",
    },
    1.8
  )
  .to(
    "#visual li:nth-child(8)",
    {
      transform: "translateY(-30%)",
      ease: "elastic.out(1, 0.5)",
    },
    1.3
  );

/*con01*/
let con01 = document.querySelector(".con01");
let con01_txtList = document.querySelectorAll(".txtList li");
let con01_imgList = document.querySelectorAll(".imgListWrap>li");
let scrollableDuration = con01.offsetHeight - window.innerHeight;
// console.log(con01_txtList, con01_imgList, scrollableDuration);

con01_txtList.forEach((txt, index) => {
  txt.addEventListener("mouseover", () => {
    con01_txtList.forEach((txt) => {
      txt.classList.remove("active");
    });
    txt.classList.add("active");
    con01_imgList.forEach((img) => {
      img.classList.remove("active");
    });
    con01_imgList[index].classList.add("active");
  });
});

window.addEventListener("scroll", () => {
  let progress = scrollY - con01.offsetTop;
  let progressPercent = Math.round((progress / scrollableDuration) * 100);
  // console.log(progressPercent);
  if (progressPercent >= 0 && progressPercent <= 100 / 5) {
    con01_txtList.forEach((txt) => {
      txt.classList.remove("active");
    });
    con01_imgList.forEach((img) => {
      img.classList.remove("active");
    });
    con01_txtList[0].classList.add("active");
    con01_imgList[0].classList.add("active");
  } else if (progressPercent >= 100 / 5 && progressPercent <= (100 / 5) * 2) {
    con01_txtList.forEach((txt) => {
      txt.classList.remove("active");
    });
    con01_imgList.forEach((img) => {
      img.classList.remove("active");
    });
    con01_txtList[1].classList.add("active");
    con01_imgList[1].classList.add("active");
  } else if (
    progressPercent >= (100 / 5) * 2 &&
    progressPercent <= (100 / 5) * 3
  ) {
    con01_txtList.forEach((txt) => {
      txt.classList.remove("active");
    });
    con01_imgList.forEach((img) => {
      img.classList.remove("active");
    });
    con01_txtList[2].classList.add("active");
    con01_imgList[2].classList.add("active");
  } else if (
    progressPercent >= (100 / 5) * 3 &&
    progressPercent <= (100 / 5) * 4
  ) {
    con01_txtList.forEach((txt) => {
      txt.classList.remove("active");
    });
    con01_imgList.forEach((img) => {
      img.classList.remove("active");
    });
    con01_txtList[3].classList.add("active");
    con01_imgList[3].classList.add("active");
  } else if (
    progressPercent >= (100 / 5) * 4 &&
    progressPercent <= (100 / 5) * 5
  ) {
    con01_txtList.forEach((txt) => {
      txt.classList.remove("active");
    });
    con01_imgList.forEach((img) => {
      img.classList.remove("active");
    });
    con01_txtList[4].classList.add("active");
    con01_imgList[4].classList.add("active");
  }
});

/*con02*/

let con2Category = document.querySelectorAll(".con02 .category li");
let con02List = document.querySelectorAll(".con02 .listWrapAll > li");
let con03List = document.querySelectorAll(".con03 .cardListWrapAll > li");
// console.log(con2Category, con02List, con03List);

con2Category.forEach((category, categoryIndex) => {
  category.addEventListener("click", () => {
    con2Category.forEach((category) => {
      category.classList.remove("active");
    });
    category.classList.add("active");
    // console.log(categoryIndex);
    con02List.forEach((list) => {
      list.classList.remove("active");
    });
    con02List[categoryIndex].classList.add("active");

    con03List.forEach((list) => {
      list.classList.remove("active");
    });
    con03List[categoryIndex].classList.add("active");
  });
});

$(function () {
  $(".con02 .list").simplyScroll({
    speed: 1, //숫자가 클 수록 움직임이 빨라짐
  });
});

/*con03 con02에서 클릭하면 클릭한거 바로 올라오기 or 스크롤하면 스티키되는거처럼 올라오기*/
// let con02_cardList = document.querySelectorAll(".con02 .list li");
// let con03_cardList = document.querySelectorAll(".con03 .cardList > li");

// con02_cardList.forEach((con02_card, con02_index) => {
//   con02_card.addEventListener("click", () => {
//     console.log(con02_index);
//     con03_cardList.forEach((con03_card) => {
//       con03_card.classList.remove("on");
//     });
//     con03_cardList[con02_index].classList.add("on");
//   });
// });

/* con02 클릭 시 con03으로 스크롤 이동 */
$(".con02 .list li").on("mouseenter", function () {
  $(this).addClass("on");
});
$(".con02 .list li").on("mouseleave", function () {
  $(this).removeClass("on");
});

$(".con02 .list li").on("click", function (e) {
  let i = $(this).index();
  let target = $(".con03 .cardListWrapAll > li.active .cardList > li").eq(i);
  console.log(target); //->무조건 카드리스트 firstchild의 eq i li 로 잡힘

  $(".con03 .cardListWrapAll > li.active .cardList > li").removeClass("on");
  let targetPosition = target.offset().top;
  target.addClass("on");

  $("html, body").animate(
    { scrollTop: targetPosition },
    1000 * (i + 1),
    function () {
      window.addEventListener("scroll", () => {
        $(".con03 .cardListWrapAll > li.active .cardList > li").removeClass(
          "on"
        );
      });
      target.addClass("on");
    }
  );
});

/* Footer*/

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

// 플로팅
let float = document.querySelector("#floating .floatFix");
let goTop = document.querySelector("#floating .top");
let inquery = document.querySelector("#floating .inquery");
let close = document.querySelector(".inquery i");

float.addEventListener("mouseenter", () => {
  gsap.timeline().to("#floating .top", { top: "-35%" });
  // .to("#floating .top", { display: "inline-block" }, 0)
  // .fromTo("#floating .top", { y: 100 }, { y: 0 }, 0.1);
});

float.addEventListener("mouseleave", (e) => {
  check = e.relatedTarget;
  if (goTop === check) {
    return;
  }
  gsap.timeline().to("#floating .top", { top: "50%" });
  // .to("#floating .top", { display: "" }, 0.1);
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
  // .fromTo("#floating .inquery", { display: "block", y: 100 }, { y: 0 }, 0.1);
});
close.addEventListener("click", () => {
  gsap.timeline().to(inquery, { top: 0, display: "none", opacity: 0 });
});
$(goTop).on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 300);
});
