# 서비스 기획서

## 문서 목록

부동산 서비스 관련 문서:

1. **[서비스 기획서](./service-guide.md)** (현재 문서): 서비스 개요, 핵심 기능, 기술 스택, 데이터 모델
2. **[화면 기획서](./screen-guide.md)**: UI/UX 기획, 화면 구성, 와이어프레임
3. **[기능 명세서](./functional-spec.md)**: 각 기능의 상세 명세, 입력/출력, 에러 처리
4. **[플로우차트](./flow-diagram.md)**: 사용자 플로우, 로직 플로우, 다이어그램
5. **[운영 기획서](./operation-guide.md)**: 운영 정책, 사용자 정책, 콘텐츠 정책

## 1. 서비스 개요

### 1.1 서비스 목표

-   직방과 유사한 부동산 플랫폼 구축
-   사용자 친화적인 모바일 앱 중심의 부동산 검색 및 매물 관리 서비스
-   실시간 매물 정보 제공 및 지도 기반 검색 기능

### 1.2 타겟 사용자

-   **임차인**: 원하는 지역의 매물을 검색하고 상세 정보를 확인하는 사용자
-   **부동산업자**: 매물을 조회하고 임차인과 채팅하는 사용자 (매물 등록은 앱 외부에서 관리)

## 2. 핵심 기능

### 2.1 사용자 인증

-   소셜 로그인 (구글)
-   이메일/전화번호 회원가입
-   프로필 관리
-   관심 매물 저장

### 2.2 매물 검색 및 필터링

-   **지도 기반 검색**
    -   카카오맵/네이버맵 연동
    -   지도에서 매물 위치 표시
    -   클러스터링으로 다수 매물 표시
-   **검색 필터**
    -   지역 선택 (시/도, 시/군/구, 동)
    -   매물 유형 (원룸, 투룸, 쓰리룸, 오피스텔, 아파트 등)
    -   가격대 필터
    -   보증금/월세 범위
    -   평수/면적
    -   옵션 필터 (주차, 엘리베이터, 반려동물 등)
    -   건물 층수
    -   관리비 포함 여부

### 2.3 매물 상세 정보

-   **기본 정보**
    -   매물 사진 (다중 이미지)
    -   주소 및 위치
    -   가격 정보 (보증금, 월세, 관리비)
    -   매물 유형 및 면적
    -   건물 정보 (층수, 건축년도 등)
-   **옵션 및 편의시설**
    -   주차 가능 여부
    -   엘리베이터
    -   반려동물 가능 여부
    -   가스/전기/수도
    -   인터넷/에어컨/냉장고 등
-   **주변 정보**
    -   대중교통 정보
    -   편의시설 (편의점, 마트, 병원 등)
    -   학교 정보
    -   주변 환경 정보

### 2.4 매물 관리 (부동산업자)

-   **매물 조회**
    -   담당 매물 목록 조회
    -   매물 상세 정보 확인
    -   매물 상태 확인
-   **문의 관리**
    -   임차인 문의 확인
    -   채팅 응답
    -   문의 상태 관리

### 2.5 관심 매물 관리

-   찜하기 기능
-   관심 매물 목록
-   가격 변동 알림
-   새 매물 알림

### 2.6 문의 및 채팅

-   매물 문의하기
-   실시간 채팅 기능
-   알림 기능

### 2.7 리뷰 및 평점

-   거래 후 리뷰 작성
-   매물 평점 시스템
-   중개사 평점

## 3. 기술 스택

### 3.1 프론트엔드

-   **프레임워크**: React Native (Expo)
-   **상태 관리**: Context API 또는 Zustand
-   **네비게이션**: Expo Router
-   **지도**: React Native Maps 또는 Kakao Map SDK
-   **이미지**: expo-image
-   **폼 관리**: React Hook Form

### 3.2 백엔드 (향후 계획)

-   **API 서버**: Node.js (Express) 또는 Python (FastAPI)
-   **데이터베이스**: PostgreSQL 또는 MongoDB
-   **파일 저장소**: AWS S3 또는 Cloudinary
-   **인증**: JWT 또는 Firebase Auth
-   **실시간 통신**: Socket.io 또는 WebSocket

### 3.3 외부 서비스

-   **지도 API**: 카카오맵 API 또는 네이버맵 API
-   **주소 검색**: 다음 주소 API
-   **이미지 처리**: Cloudinary 또는 AWS Lambda
-   **푸시 알림**: Firebase Cloud Messaging (FCM)

## 4. 데이터 모델

### 4.1 사용자 (User)

```typescript
{
  id: string;
  email: string;
  phone?: string;
  name: string;
  profileImage?: string;
  userType: 'tenant' | 'agent';
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 매물 (Property)

```typescript
{
  id: string;
  userId: string; // 등록자 ID
  title: string;
  description: string;
  propertyType: 'oneroom' | 'tworoom' | 'threeroom' | 'officetel' | 'apartment';
  address: {
    fullAddress: string;
    sido: string;
    sigungu: string;
    dong: string;
    lat: number;
    lng: number;
  };
  price: {
    deposit: number; // 보증금
    monthlyRent: number; // 월세
    maintenanceFee: number; // 관리비
  };
  area: number; // 평수 또는 m²
  floor: number; // 층수
  buildingFloor: number; // 건물 총 층수
  buildingYear?: number; // 건축년도
  images: string[]; // 이미지 URL 배열
  options: {
    parking: boolean;
    elevator: boolean;
    pet: boolean;
    // ... 기타 옵션
  };
  status: 'available' | 'reserved' | 'sold';
  views: number; // 조회수
  likes: number; // 찜 수
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.3 관심 매물 (Favorite)

```typescript
{
    id: string;
    userId: string;
    propertyId: string;
    createdAt: Date;
}
```

### 4.4 문의 (Inquiry)

```typescript
{
    id: string;
    propertyId: string;
    userId: string;
    message: string;
    status: "pending" | "answered" | "closed";
    createdAt: Date;
}
```

## 5. 화면 구성

화면 구성 및 기획에 대한 상세 내용은 [화면 기획서](./screen-guide.md)를 참고하세요.

## 6. 개발 단계

### 1단계: 기본 구조 및 인증 (1-2주)

-   [ ] 프로젝트 초기 설정
-   [ ] 네비게이션 구조 설계
-   [ ] 기본 UI 컴포넌트 개발
-   [ ] 인증 화면 개발
-   [ ] 로그인/회원가입 기능 (목 데이터)

### 2단계: 매물 검색 및 리스트 (2-3주)

-   [ ] 홈 화면 개발
-   [ ] 검색 기능 구현
-   [ ] 필터 기능 구현
-   [ ] 매물 리스트 화면
-   [ ] 매물 카드 컴포넌트
-   [ ] 무한 스크롤

### 3단계: 지도 기능 (2주)

-   [ ] 지도 라이브러리 연동
-   [ ] 지도 화면 개발
-   [ ] 매물 마커 표시
-   [ ] 클러스터링
-   [ ] 지도 기반 검색

### 4단계: 매물 상세 (1-2주)

-   [ ] 매물 상세 화면 개발
-   [ ] 이미지 갤러리
-   [ ] 찜하기 기능
-   [ ] 공유하기 기능
-   [ ] 주변 정보 표시

### 5단계: 부동산업자 기능 (1주)

-   [ ] 부동산업자 전용 화면
-   [ ] 담당 매물 목록 조회
-   [ ] 매물 상세 정보 확인
-   [ ] 문의 관리 화면

### 6단계: 사용자 기능 (1-2주)

-   [ ] 내 정보 화면
-   [ ] 관심 매물 목록 (임차인)
-   [ ] 담당 매물 관리 (부동산업자)
-   [ ] 설정 화면

### 7단계: 백엔드 연동 (3-4주)

-   [ ] API 서버 구축
-   [ ] 데이터베이스 설계 및 구축
-   [ ] 인증 시스템 구현
-   [ ] 매물 생성/조회/수정/삭제 API
-   [ ] 이미지 업로드 API
-   [ ] 프론트엔드 API 연동

### 8단계: 고급 기능 (2-3주)

-   [ ] 실시간 채팅
-   [ ] 푸시 알림
-   [ ] 리뷰 시스템
-   [ ] 검색 최적화
-   [ ] 성능 최적화

## 7. UI/UX 가이드

### 7.1 디자인 원칙

-   직관적이고 사용하기 쉬운 인터페이스
-   깔끔하고 모던한 디자인
-   빠른 로딩 속도
-   반응형 디자인

### 7.2 색상 팔레트

-   주 색상: 부동산 서비스에 적합한 신뢰감 있는 색상
-   보조 색상: 강조 및 행동 유도 버튼
-   배경색: 밝고 깔끔한 배경
-   텍스트 색상: 가독성 높은 텍스트 색상

### 7.3 타이포그래피

-   명확하고 읽기 쉬운 폰트
-   적절한 폰트 크기 계층 구조

## 8. 성능 최적화

### 8.1 이미지 최적화

-   이미지 압축
-   지연 로딩
-   썸네일 사용
-   WebP 포맷 지원

### 8.2 데이터 최적화

-   페이지네이션
-   무한 스크롤
-   캐싱 전략
-   API 응답 최적화

### 8.3 렌더링 최적화

-   React.memo 활용
-   useMemo, useCallback 적절히 사용
-   리스트 가상화 (필요시)

## 9. 보안 고려사항

-   사용자 인증 및 권한 관리
-   개인정보 보호
-   이미지 업로드 검증
-   XSS(크로스 사이트 스크립팅), CSRF(크로스 사이트 요청 위조) 방지
-   API 보안 (요청 제한 등)

## 10. 향후 확장 계획

-   부동산 시세 정보 제공
-   대출 계산기
-   이사 서비스 연계
-   부동산 투자 정보
-   커뮤니티 기능
-   AI 기반 매물 추천

## 11. 참고 자료

-   직방 앱 분석
-   네이버 부동산
-   다방
-   해외 서비스: Zillow, Trulia 등

---

**작성일**: 2024년
**버전**: 1.0
