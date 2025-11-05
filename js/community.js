$(document).ready(function () {
  const $newsTable = $("#page1 table, #page1 .page-nav");
  const $noticeWrap = $(".notice_wrap");
  const $navItems = $("nav li");

  // 처음에는 뉴스만
  $noticeWrap.hide();

  // nav 클릭
  $navItems.click(function () {
    const text = $(this).text().trim();
    $navItems.removeClass("active");
    $(this).addClass("active");
    moveHighlight($(this));

    if (text === "공지사항") {
      $newsTable.hide();
      $noticeWrap.fadeIn(200);
    } else {
      $noticeWrap.hide();
      $newsTable.fadeIn(200);
    }
  });

  // 페이지 네비 클릭
  $(".page-nav a").click(function (e) {
    e.preventDefault();
    const page = $(this).data("page");
    $(".page-nav a").removeClass("active");
    $(this).addClass("active");

    // 테이블 내용 예시 페이지 전환
    const $tbody = $("#page1 table tbody");
    $tbody.empty();

    if (page === 1) {
      $("#total-count").text("6");
      $tbody.append(`
        <tr><td>뉴스 제목 1</td><td>2025-10-28</td><td>관리자</td></tr>
        <tr><td>뉴스 제목 2</td><td>2025-10-27</td><td>홍길동</td></tr>
        <tr><td>뉴스 제목 3</td><td>2025-10-26</td><td>관리자</td></tr>
        <tr><td>뉴스 제목 4</td><td>2025-10-25</td><td>김철수</td></tr>
        <tr><td>뉴스 제목 5</td><td>2025-10-24</td><td>관리자</td></tr>
        <tr><td>뉴스 제목 6</td><td>2025-10-23</td><td>박영희</td></tr>
      `);
    } else if (page === 2) {
      $("#total-count").text("3");
      $tbody.append(`
        <tr><td>뉴스 제목 7</td><td>2025-10-22</td><td>관리자</td></tr>
        <tr><td>뉴스 제목 8</td><td>2025-10-21</td><td>홍길동</td></tr>
        <tr><td>뉴스 제목 9</td><td>2025-10-20</td><td>김철수</td></tr>
      `);
    }
  });

  // highlight 이동 함수
  function moveHighlight($el) {
    const left = $el.position().left;
    const width = $el.outerWidth();
    const height = $el.outerHeight();
    $(".highlight").css({ left: left, width: width, height: height });
  }

  // 초기 highlight 위치
  moveHighlight($navItems.filter(".active"));
});

$(function () {
  $('.notice_wrap li').on('mouseenter', function () {
    const $li = $(this);

    // 이미 애니메이션 중이면 중복 실행 방지
    if ($li.is(':animated')) return;

    // 반짝 + 살짝 흔들리는 애니메이션
    $li
      .css({
        position: 'relative',
        zIndex: 10,
      })
      .animate({ top: '-5px' }, 100)
      .animate({ top: '0px' }, 100)
      .animate({ top: '-3px' }, 80)
      .animate({ top: '0px' }, 80)
      .addClass('shine'); // 반짝 효과 추가
  });

  // 마우스가 나가면 반짝 효과 제거
  $('.notice_wrap li').on('mouseleave', function () {
    $(this).removeClass('shine');
  });
});


  
