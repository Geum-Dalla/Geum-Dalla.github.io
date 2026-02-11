---
title: Nest.JS 튜토리얼
description: ai로 작성된 테스트 마크다운
date: 26.2.12
---

# Next.js 튜토리얼

## 1. Next.js란?

Next.js는 React 기반의 프레임워크로, 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 쉽게 구현할 수 있도록 도와줍니다. Vercel에서 개발한 이 프레임워크는 현대적인 웹 애플리케이션을 빠르고 효율적으로 구축할 수 있게 해줍니다.

## 2. Next.js 설치하기

Next.js 프로젝트를 시작하려면 다음 명령어를 실행하세요:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

이 명령어는 새로운 Next.js 프로젝트를 생성하고 개발 서버를 시작합니다.

## 3. 프로젝트 구조

Next.js 프로젝트의 기본 구조는 다음과 같습니다:

- `pages/` - 페이지 컴포넌트를 저장하는 디렉토리
- `public/` - 정적 파일(이미지, 폰트 등)을 저장하는 디렉토리
- `styles/` - CSS 파일을 저장하는 디렉토리
- `components/` - 재사용 가능한 컴포넌트를 저장하는 디렉토리

## 4. 첫 번째 페이지 만들기

`pages` 디렉토리에 새로운 파일을 만들어 페이지를 추가할 수 있습니다. 예를 들어 `pages/about.js` 파일을 생성하면:

```jsx
export default function About() {
  return (
    <div>
      <h1>소개 페이지</h1>
      <p>Next.js로 만든 첫 번째 페이지입니다.</p>
    </div>
  );
}
```

이제 `/about` 경로로 접속하면 이 페이지를 볼 수 있습니다.

## 5. 라우팅

Next.js는 파일 시스템 기반 라우팅을 사용합니다. `pages` 디렉토리의 파일 구조가 그대로 URL 경로가 됩니다:

- `pages/index.js` → `/`
- `pages/about.js` → `/about`
- `pages/blog/first-post.js` → `/blog/first-post`

## 6. 다음 단계

이제 Next.js의 기본을 이해했습니다. 다음으로 학습할 주제:

- 동적 라우팅
- API Routes
- 데이터 페칭 (getStaticProps, getServerSideProps)
- 스타일링 (CSS Modules, Styled Components)
- 이미지 최적화
