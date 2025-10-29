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
  let rotated = false; // 회전 여부 체크

  $(window).on("scroll", function () {
    if (!rotated) {
      // 아직 회전 안했으면
      $(".creative2 li").css("transform", "rotateY(360deg)");
      rotated = true; // 회전 완료
    }
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
});
