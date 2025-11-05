/*section1 제이쿼리*/
$(function () {
  $(".creative1 .left li").on("click", function () {
    let leftUl = $(this).index();
    // console.log(leftUl);
    $(".creative1 .left li").removeClass("on");
    $(this).addClass("on");
    $(".creative1 .right ul").removeClass("Img");

    $(".creative1 .right ul").eq(leftUl).addClass("Img");
  });
  /*section2 제이쿼리*/
  // let rotated = false; // 회전 여부 체크

  // $(window).on("scroll", function () {
  //   if (!rotated) {
  //     // 아직 회전 안했으면
  //     $(".creative2 li").css("transform", "rotateY(360deg)");
  //     rotated = true; // 회전 완료
  //   }
  // });
  $(".creative2 li").on("mouseenter", function () {
    $(this).css({
      transform: "rotateY(180deg)",
      transition: "transform 0.6s ease",
    });
  });

  $(".creative2 li").on("mouseleave", function () {
    $(this).css({
      transform: "rotateY(0deg)",
      transition: "transform 0.6s ease",
    });
  });
  /*section3 제이쿼리*/
  $(".creative3 li").on("mouseenter", function () {
    let textP = $(this).index();
    console.log(textP);
    $(".creative3 .creative3Img").removeClass("big");
    $(".creative3 .creative3Img").eq(textP).addClass("big");
    $(".creative3 p").removeClass("show");
    $(".creative3 p").eq(textP).addClass("show");
  });
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
});
