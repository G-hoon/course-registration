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
- **UI**: Framer Motion, Lucide React, React Hot Toast
- **Testing**: Vitest + React Testing Library
- **Font**: Pretendard (next/font/local)

## 시작하기

### 사전 요구사항

- Node.js 18+
- pnpm 10+
- Docker (백엔드 API 서버)

### 백엔드 API 서버 실행

```bash
# 1. Docker 이미지 로드
docker load -i backend_mock.tar

# 2. 서버 실행
docker run --rm -p 8080:8080 backend_mock_for_assignment-api:latest
```

서버가 http://localhost:8080 에서 실행됩니다.

### 프로젝트 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 환경변수 설정
cp .env.example .env.local

# 개발 서버 실행
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 환경변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080/api` | API 서버 주소 |

### 테스트

```bash
pnpm test          # 전체 테스트 실행
pnpm test:watch    # watch 모드
```

### 빌드

```bash
pnpm build
pnpm start
```

## 프로젝트 구조

```
src/
├── app/                           # App Router 페이지
│   ├── courses/                   # 강의 목록 / 수강 신청
│   │   ├── new/                   # 강의 개설 (강사 전용)
│   │   │   ├── CreateCourseConfirmModal.tsx
│   │   │   └── page.tsx
│   │   ├── CourseCard.tsx
│   │   ├── CourseCardSkeleton.tsx
│   │   ├── CourseList.tsx
│   │   ├── EnrollConfirmModal.tsx
│   │   └── page.tsx
│   ├── login/                     # 로그인
│   ├── signup/                    # 회원가입
│   │   └── complete/              # 회원가입 완료
│   ├── layout.tsx
│   ├── providers.tsx              # QueryClient, Toaster
│   └── globals.css
├── components/                    # 공용 컴포넌트
│   ├── Button.tsx
│   ├── ClientOnly.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── Modal.tsx                  # 모달 렌더러 (Portal + Framer Motion)
│   ├── PasswordInput.tsx
│   └── Radio.tsx
├── hooks/
│   ├── useIntersectionObserver.ts # 무한 스크롤
│   └── useViewportHeight.ts      # 모바일 뷰포트
├── lib/
│   ├── api/                       # API 함수 (함수별 개별 파일)
│   │   ├── client.ts              # Ky 인스턴스 (인증 자동 처리)
│   │   ├── signup.ts
│   │   ├── login.ts
│   │   ├── getCourses.ts
│   │   ├── createCourse.ts
│   │   └── enrollBatch.ts
│   ├── format.ts                  # 포맷팅 유틸리티
│   ├── signupCredentials.ts       # 회원가입 → 완료 페이지 크리덴셜 전달
│   └── validate.ts                # 폼 유효성 검증
├── stores/
│   ├── authStore.ts               # 인증 상태 (JWT + Cookie)
│   └── modalStore.ts              # 모달 상태 (히스토리 연동)
├── types/                         # 타입 정의 (도메인별 분리)
│   ├── auth.ts
│   ├── course.ts
│   ├── enrollment.ts
│   ├── api.ts
│   └── modal.ts
└── proxy.ts                       # 라우트 보호 (Next.js Proxy)
```

## 주요 기능

### 회원가입 / 로그인
- 이메일, 비밀번호, 이름, 휴대폰 번호 입력
- 수강생 / 강사 역할 선택
- 비밀번호 규칙: 영문 소문자, 대문자, 숫자 중 2가지 이상 조합, 6~10자
- 휴대폰 번호 자동 포맷팅 (010-XXXX-XXXX)
- JWT 토큰 기반 인증 (Cookie + Zustand persist)
- 회원가입 완료 페이지에서 바로 로그인 지원

### 강의 목록 / 수강 신청
- 최근 등록순 / 신청자 많은순 / 신청률 높은순 정렬
- 무한 스크롤 (Intersection Observer)
- Suspense + Skeleton UI로 정렬 전환 시 로딩 처리
- 체크박스 다중 선택 후 일괄 수강 신청
- 확인 모달 → 성공 시 Toast, 부분 실패 시 모달 내 에러 표시

### 강의 개설 (강사 전용)
- 강의 제목, 최대 수강 인원, 가격 입력
- 숫자 입력 시 콤마 자동 포맷팅
- 입력값 유효성 검증 (onTouched 모드)
- 확인 모달 → 성공 시 Toast + 목록 페이지 이동

### 인증 / 라우트 보호
- **Proxy (서버)**: 쿠키 기반 라우트 보호 — 미인증 시 `/login`, 인증 시 `/courses` 리다이렉트
- **401 전역 처리**: API 응답 401 시 자동 로그아웃 + Toast + `/login` 리다이렉트
- **강사 전용 페이지**: `/courses/new`는 INSTRUCTOR 역할만 접근 가능

## 추가 구현 사항

과제 기본 요구사항 외에 아래 기능들을 추가로 구현했습니다.

### UX 개선
- **회원가입 완료 페이지**: 가입 성공 후 전용 완료 페이지 제공, "바로 로그인" 버튼으로 즉시 로그인 지원
- **확인 모달**: 강의 개설/수강 신청 전 확인 모달을 통해 실수 방지, 모달 내에서 에러 메시지 표시
- **Toast 알림**: 강의 개설 성공, 수강 신청 성공, 로그아웃 등 주요 액션에 대한 피드백 제공
- **비밀번호 보기/숨기기**: 비밀번호 입력 필드에 visibility 토글 버튼 제공
- **수강 신청 부분 실패 처리**: 일괄 신청 시 일부 실패한 강의의 사유를 모달 내에 개별 표시
- **모달 뒤로가기 연동**: 브라우저 뒤로가기 버튼으로 모달 닫기 지원 (히스토리 관리)

### 성능 / 로딩
- **무한 스크롤**: Intersection Observer 기반 자동 페이지네이션
- **Skeleton UI**: 강의 목록 로딩 시 Skeleton 컴포넌트로 레이아웃 시프트 방지
- **Suspense 경계**: 정렬 전환 시 Suspense fallback으로 자연스러운 로딩 전환

### 인증 / 보안
- **서버 사이드 라우트 보호**: Next.js Proxy를 활용한 서버 레벨 인증 체크 (클라이언트 깜빡임 없음)
- **401 전역 에러 처리**: HTTP 클라이언트 레벨에서 토큰 만료 감지 → 자동 로그아웃 + 안내 toast
- **역할 기반 접근 제어**: 강사(INSTRUCTOR) 전용 페이지에 대한 클라이언트 사이드 role 체크

### 입력 편의성
- **숫자 콤마 포맷팅**: 가격, 수강 인원 입력 시 실시간 콤마 자동 삽입
- **전화번호 자동 포맷팅**: 숫자 입력 시 `010-XXXX-XXXX` 형식 자동 변환
- **실시간 폼 유효성 검증**: `onTouched` 모드로 필드 터치 시점에 즉시 에러 표시

### 모바일 대응
- **뷰포트 높이 보정**: 모바일 브라우저의 주소창/툴바로 인한 `100vh` 오차를 `useViewportHeight` 훅으로 보정

### 코드 품질
- **단위 테스트**: Vitest + React Testing Library로 유틸리티 함수 및 공용 컴포넌트 테스트 53개 작성 (전체 통과)
- **컴포넌트 재사용 구조**: Input → PasswordInput wrapping, 범용 Modal 시스템 등 확장 가능한 설계
- **API 함수 분리**: 도메인별 개별 파일로 분리, 인증 토큰 자동 주입으로 호출부 단순화
- **타입 도메인별 분리**: auth, course, enrollment, api, modal 별도 파일 관리
