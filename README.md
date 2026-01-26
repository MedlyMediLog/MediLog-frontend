# TTAK

공공데이터 기반 **건강기능식품(건기식) 안심 정보 서비스**  
사용자가 카테고리·타겟(예: 임산부, 청소년 등)에 맞춰 제품을 탐색하고,  
제품 상세에서 성분·주의사항·섭취·보관 가이드까지 한 번에 확인할 수 있도록 돕습니다.

> 목표: “광고성 정보”가 아니라 **근거 기반(공공/공식 데이터)**으로  
> 사용자에게 이해하기 쉬운 가이드를 제공

---

## Site URL
https://medilog.today

---

## Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **TanStack React Query**

---

## Key Features

### 1) 제품 탐색 (Listing)
- 건강 주제(Category) 기반 제품 리스트 조회
- 타겟(Target) 필터링 (예: 전체 / 임산부 / 청소년 / 다이어터 등)
- 모바일 / 데스크탑 UI 분리 대응
- “Load More” 및 스크롤 UX 지원

### 2) 제품 상세 (Detail)
- 제품 요약 카드 (제조사, 제형, 한 줄 요약 등)
- 성분(Ingredients) 정보 제공
- 안전 가이드(Safety Guide): 주의 / 금기 문구 표시
- 섭취·보관(Intake / Storage) 가이드
- 일반 사용(General Usage) 안내
- 공유(Share) 기능

### 3) 인증 · 세션
- 쿠키 기반 인증 흐름 (`credentials: 'include'`)
- `/api/*` Route Handler를 통한 백엔드 프록시 호출
  - CORS / 쿠키 스코프 이슈 대응
- 401 응답에 대한 UX 처리  
  (예: 최근 본 상품 API는 401 시 빈 배열 반환)

### 4) 사용자 편의 기능
- 최근 본 상품 조회
- 모바일 사이드바 (프로필 / 로그인 / 최근 본 상품)
- 로그인 상태에 따른 UI 즉시 반영  
  (React Query 캐시 / 무효화 전략, 추후 Zustand로 UI 상태 보강 예정)

### 5) Analytics (진행/설계 포함)
- **5-click 퍼널**: 상세 페이지 도달까지의 클릭 수 추적
- **체류 시간 이벤트**: 페이지 체류 / 활동 시간 측정 (anonId 기반)
- 세션 스토리지 / 로컬 스토리지 기반 익명 식별자 관리

---

## Architecture Overview

클라이언트가 백엔드를 직접 호출하지 않고,  
**Next.js Route Handler (`/api/...`)**를 통해 백엔드 API를 프록시 호출합니다.

이를 통해:
- 인증 쿠키 흐름 단순화
- CORS 및 서브도메인 이슈 완화
- 공통 에러 처리 및 보안 관리 용이

---

## Deployment & CI/CD

- **GitHub Actions** 기반 CI/CD 파이프라인 구축
  - `main` 브랜치 기준 자동 빌드 및 배포
- **AWS EC2** 환경에 서비스 배포 및 운영
- 배포 자동화를 통해 안정적인 릴리즈 및 휴먼 에러 최소화

---

## Collaboration

- 이슈 및 작업 관리는 **Jira**
- 기획 및 기술 문서는 **Confluence** 기반으로 관리

---

## Commit Convention

- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `refactor:` 리팩토링 (동작 변경 없음)
- `style:` UI / 스타일 변경
- `chore:` 설정, 의존성, 빌드 관련 작업
