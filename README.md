# 수강신청 시스템

강의 등록, 조회, 수강 신청 기능을 제공하는 웹 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (persist middleware)
- **Data Fetching**: TanStack React Query
- **Form**: React Hook Form
- **HTTP Client**: Ky
- **Testing**: Vitest + React Testing Library
- **Font**: Pretendard (next/font/local)

## 시작하기

### 사전 요구사항

- Node.js 18+
- pnpm
- Docker (백엔드 API 서버)

### 설치

```bash
pnpm install
```

### 환경변수 설정

```bash
cp .env.example .env.local
```

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080/api` | API 서버 주소 |

### 백엔드 서버 실행

```bash
docker-compose up -d
```

### 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 테스트

```bash
pnpm test          # 전체 테스트 실행
pnpm test:watch    # watch 모드
```

## 프로젝트 구조

```
src/
├── app/                    # App Router 페이지
│   ├── courses/            # 강의 목록 / 수강 신청
│   │   ├── new/            # 강의 개설
│   │   ├── CourseCard.tsx
│   │   ├── CourseCardSkeleton.tsx
│   │   └── CourseList.tsx
│   ├── login/              # 로그인
│   ├── signup/             # 회원가입
│   ├── layout.tsx
│   ├── providers.tsx       # QueryClient Provider
│   └── globals.css
├── components/             # 공용 컴포넌트
│   ├── AuthGuard.tsx       # 인증 필요 페이지 보호
│   ├── PublicGuard.tsx     # 비로그인 전용 페이지 보호
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── Button.tsx
│   └── Radio.tsx
├── hooks/
│   └── useIntersectionObserver.ts
├── lib/
│   ├── api.ts              # Ky HTTP 클라이언트
│   ├── validate.ts         # 폼 유효성 검증
│   └── format.ts           # 포맷팅 유틸리티
├── stores/
│   └── authStore.ts        # 인증 상태 (Zustand)
└── types/
    └── index.ts
```

## 주요 기능

### 회원가입 / 로그인
- 이메일, 비밀번호, 이름, 휴대폰 번호 입력
- 수강생 / 강사 역할 선택
- 비밀번호 규칙: 영문 소문자, 대문자, 숫자 중 2가지 이상 조합, 6~10자
- 휴대폰 번호 자동 포맷팅 (010-XXXX-XXXX)
- JWT 토큰 기반 인증, localStorage 유지

### 강의 목록 / 수강 신청
- 최신순 / 수강률순 / 가격순 정렬
- 무한 스크롤 (Intersection Observer)
- Suspense + Skeleton UI로 정렬 전환 시 로딩 처리
- 체크박스 다중 선택 후 일괄 수강 신청
- 부분 성공/실패 결과 표시

### 강의 개설 (강사 전용)
- 강의 제목, 최대 수강 인원, 가격 입력
- 숫자 입력 시 콤마 자동 포맷팅
- 입력값 유효성 검증 (onTouched 모드)

### 라우트 보호
- `AuthGuard`: 미인증 사용자 → `/login` 리다이렉트
- `PublicGuard`: 인증된 사용자 → `/courses` 리다이렉트
