/project-root/
│
├─ index.html ← 메인 페이지 (인트로 + 헤더 + 메인 + 푸터)
├─ about.html ← 서브페이지 ① (소개)
├─ work.html ← 서브페이지 ② (작업물/포트폴리오)
├─ creative.html ← 서브페이지 ③ (창작물)
├─ community.html ← 서브페이지 ④ (커뮤니티/연락)
│
├─ components/ ← 공통 컴포넌트 (선택사항)
│ ├─ header.html
│ ├─ footer.html
│ └─ intro.html
│
├─ css/
│ ├─ style.css ← 전체 공통 스타일
│ └─ sub.css ← 서브페이지 전용 스타일
│
├─ js/
│ ├─ main.js ← index 전용 (인트로 효과, 메인 비주얼)
│ ├─ sub.js ← 서브 전용 (필터링, 애니메이션)
│ └─ include.js ← (선택) header/footer 자동 불러오기
│
└─ images/
├─ main/ ← 메인/인트로 이미지
├─ work/ ← 포트폴리오, 작업 이미지
└─ common/ ← 로고, 아이콘 등

[페이지 구성]

1. index.html - 메인 페이지

인트로 섹션 (페이드인 효과)
헤더 네비게이션
메인 비주얼
주요 프로젝트 미리보기
푸터

2. about.html - 소개 페이지

프로필 정보
스킬 목록
경력 타임라인

3. work.html - 작업물 페이지

프로젝트 필터 기능
갤러리 그리드
프로젝트 상세 정보

4. creative.html - 창작물 페이지

창의적 작업물 전시
그리드 레이아웃

5. community.html - 커뮤니티/연락 페이지

연락처 정보
문의 폼
소셜 미디어 링크

[주요 기능]

JavaScript 기능

main.js:

인트로 페이드아웃 효과
스크롤 애니메이션
부드러운 스크롤
헤더 스타일 동적 변경

sub.js:

페이지 로드 애니메이션
Work 페이지 필터링
스크롤 애니메이션
폼 제출 처리

include.js (선택사항):

컴포넌트 자동 로드
현재 페이지 강조

[사용 방법]

1. 기본 사용
   모든 HTML 파일을 그대로 사용하면 됩니다. 각 페이지는 독립적으로 작동합니다.

2. 컴포넌트 사용 (선택사항)
   헤더/푸터를 별도 파일로 관리하려면:

<!-- HTML 파일에서 -->
<div data-include="components/header.html"></div>
<main>

<!-- 콘텐츠 -->
</main>
<div data-include="components/footer.html"></div>

<!-- include.js 스크립트 추가 -->
<script src="js/include.js"></script>

3. 이미지 추가

images/main/ - 메인 페이지 이미지
images/work/ - 작업물 이미지
images/common/ - 로고, 아이콘

4. 커스터마이징

색상 변경: css/style.css에서 #667eea, #764ba2 등을 원하는 색상으로 변경
폰트 변경: body 선택자의 font-family 수정
레이아웃 조정: 그리드 설정은 grid-template-columns 값 조정

[반응형 디자인]

모바일, 태블릿, 데스크톱 모두 지원
미디어 쿼리: 768px 기준

[개발 환경]

HTML5
CSS3 (Grid, Flexbox, Animation)
Vanilla JavaScript (ES6+)
외부 라이브러리 불필요

[커스터마이징 가이드]

색상 테마 변경
css/_ style.css에서 _/
.intro-section {
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}

.nav a:hover,
.nav a.active {
color: #YOUR_COLOR;
}

인트로 시간 조정
javascript// main.js에서
setTimeout(() => {
intro.style.opacity = '0';
}, 3000); // 3000ms = 3초

필터 카테고리 추가

<!-- work.html에서 -->

<button class="filter-btn" data-filter="your-category">Your Category</button>

[호스팅]

GitHub Pages
