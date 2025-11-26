# Product Requirements Document (PRD)
# 외국인 전용 부동산/중고차 매물 플랫폼

> **작성일**: 2024년  
> **버전**: 2.0 (현재 구현 기반 업데이트)  
> **프로젝트명**: House & Car Platform  

---

## 1. 프로젝트 개요

### 1.1 비전 및 미션

**비전**: 한국에 거주하는 외국인들이 가장 쉽고 신뢰할 수 있는 부동산 및 중고차 매물 찾기 플랫폼

**미션**: 
- 복잡한 한국 부동산 및 중고차 시장을 외국인도 쉽게 이해하고 이용할 수 있도록 단순화
- 페이스북 그룹의 산발적인 매물 정보를 체계적이고 검증된 플랫폼으로 대체
- 언어와 문화의 장벽 없이 안전한 매물 거래 환경 제공
- 부동산과 중고차를 하나의 플랫폼에서 통합 제공하여 사용자 편의성 극대화

### 1.2 핵심 가치 제안

1. **Simple & Clean**: 직방 대비 80% 간소화된 UX로 매물찾기에만 집중
2. **Foreign-First**: 외국인 관점에서 설계된 UI/UX와 다국어 지원
3. **Trust & Safety**: 검증된 매물과 신뢰할 수 있는 거래 환경
4. **Mobile-Optimized**: 모바일 중심의 직관적 인터페이스

### 1.3 타겟 사용자

**Primary Users (1차 사용자)**
- **외국인 임차인** (20-40세, 한국 거주 1-5년)
  - 영어 사용자 우선 (중국어, 일본어는 2단계)
  - 현재 페이스북 그룹에서 매물 정보 수집
  - 간단하고 직관적인 서비스 선호

**Secondary Users (2차 사용자)**  
- **개인 임대인/판매자**: 외국인 대상 부동산/중고차 보유자
- **부동산 중개업소**: 외국인 고객 확보 희망
- **중고차 딜러**: 외국인 고객 확보 희망

---

## 2. 문제 정의 및 솔루션

### 2.1 해결하고자 하는 문제

**현재 외국인들이 겪는 매물 찾기 문제점:**

1. **페이스북 그룹의 한계**
   - 산발적이고 정리되지 않은 매물 정보
   - 검색/필터링 기능 부재
   - 중복 게시물과 만료된 정보 혼재
   - 사기 매물에 대한 검증 시스템 부재

2. **기존 부동산/중고차 앱의 진입 장벽**
   - 복잡한 한국어 전문 용어 (전세, 월세, 관리비, 연식, 주행거리 등)
   - 과도한 기능으로 인한 복잡성
   - 외국인 특화 기능 부재
   - 복잡한 회원가입 및 인증 과정
   - 부동산과 중고차를 별도 플랫폼에서 찾아야 하는 불편함

3. **정보 신뢰성 문제**
   - 부정확한 매물 정보
   - 허위 매물 및 사기 위험
   - 임대인과의 소통 어려움

### 2.2 제안하는 솔루션

1. **초간단 통합 매물 검색 플랫폼**
   - 부동산과 중고차를 하나의 플랫폼에서 제공
   - 5초 내 원하는 매물 검색 가능
   - 3단계 이내 매물 상세정보 확인
   - 원클릭 문의하기 기능

2. **외국인 맞춤 UX/UI**
   - 영어 우선 인터페이스
   - 한국 부동산/중고차 용어 간소화
   - 직관적 아이콘과 이미지 중심 설계
   - Stack Navigation 기반의 직관적인 화면 전환

3. **신뢰성 검증 시스템**
   - 매물 등록 시 필수 정보 검증
   - 사용자 리뷰 및 평점 시스템
   - 신고 및 제재 시스템

### 2.3 기대 효과

**사용자 측면:**
- 매물 찾기 시간 50% 단축
- 사기 매물 피해 위험 80% 감소
- 서비스 이용 만족도 향상

**비즈니스 측면:**
- 월간 활성 사용자(MAU) 10만명 달성 (1년 내)
- 부동산 매물 등록 수 월 1,000건 달성
- 중고차 매물 등록 수 월 500건 달성
- 통합 플랫폼으로 사용자 편의성 및 리텐션 향상

---

## 3. 기능 요구사항

### 3.1 핵심 기능 (우선순위별)

#### P0 (Must Have) - MVP 기능

**1. 사용자 인증 시스템**
- Google OAuth 소셜 로그인
- 기본 프로필 관리
- 비로그인 사용자도 검색/조회 가능

**2. 부동산(House) 검색 기능**
- 키워드 검색 (지역명, 역명)
- 지도 기반 검색 (/house)
- 리스트 뷰 (/house/list)
- 기본 필터 (가격, 거래 유형, 면적)
- 매물 상세 정보 (/house/[id])

**3. 중고차(Car) 검색 기능**
- 키워드 검색 (모델명, 브랜드, 연식)
- 리스트 뷰 (/car)
- 고급 필터 (브랜드, 가격, 연식, 주행거리, 연료, 변속기)
- 차량 상세 정보 (/car/[id])

**4. 찜하기 기능**
- 부동산/중고차 통합 찜 목록 (/saved)
- 카테고리 필터 (All/House/Car)
- 사용 가능 매물만 보기 옵션

**5. 기본 문의 기능**
- 매물/차량 문의하기
- 실시간 채팅 시스템 (/chat, /chat/[id])
- 채팅 목록 및 메시지 전송

#### P1 (Should Have) - 1차 확장 기능

**1. 고급 검색 필터**
- 부동산: 상세 옵션 필터 (주차, 엘리베이터, 반려동물 등)
- 중고차: 안전 정보, 옵션 필터
- 저장된 검색 조건
- 검색 알림 기능

**2. 사용자 기능 확장**
- 최근 본 매물/차량
- 사용자 리뷰 시스템
- 프로필 관리 (/profile, /myprofile)
- 알림 시스템 (/notifications)

**3. 실시간 채팅 고도화**
- 이미지 전송
- 푸시 알림
- 읽음 확인 기능

#### P2 (Could Have) - 향후 확장 기능

**1. 커뮤니티 기능**
- 지역별 정보 공유
- 사용자 간 Q&A

**2. 중고거래 기능 (장기 목표)**
- 가구/생활용품 거래
- 동네 기반 거래

**3. 매물 등록 기능**
- 사용자 직접 매물 등록
- 이미지 업로드
- 매물 관리 대시보드

### 3.2 상세 기능 명세

#### 3.2.1 사용자 인증 시스템

**요구사항:**
- REQ-AUTH-001: 시스템은 Google OAuth 2.0을 통한 소셜 로그인을 지원해야 한다
- REQ-AUTH-002: 로그인 과정은 3클릭 이내로 완료되어야 한다
- REQ-AUTH-003: 사용자 프로필은 이름, 연락처, 선호 지역 정보를 포함해야 한다
- REQ-AUTH-004: 비로그인 사용자도 매물 검색 및 조회가 가능해야 한다

**기술 명세:**
- OAuth 2.0 PKCE 플로우 구현
- JWT 토큰 기반 인증
- 토큰 만료: Access Token 1시간, Refresh Token 30일
- 자동 로그인 유지

#### 3.2.2 부동산 검색 기능

**요구사항:**
- REQ-SEARCH-001: 키워드 검색 응답 시간은 2초 이내여야 한다
- REQ-SEARCH-002: 검색 결과는 10개씩 페이지네이션되어야 한다
- REQ-SEARCH-003: 지도 검색 시 현재 화면 영역의 매물만 표시해야 한다
- REQ-SEARCH-004: 필터 조합 시 실시간으로 결과 수가 업데이트되어야 한다
- REQ-SEARCH-005: 지도 뷰와 리스트 뷰 간 전환이 원활해야 한다

**기술 명세:**
- Elasticsearch 또는 Algolia를 활용한 검색 엔진
- 카카오맵 API 연동 (향후 구현)
- 무한 스크롤 또는 페이지네이션 구현
- 검색 쿼리 캐싱 (Redis)
- 최근 검색어 저장 (로컬 스토리지)

#### 3.2.3 중고차 검색 기능

**요구사항:**
- REQ-CAR-SEARCH-001: 키워드 검색 응답 시간은 2초 이내여야 한다
- REQ-CAR-SEARCH-002: 브랜드, 가격, 연식, 주행거리, 연료, 변속기 필터 조합 지원
- REQ-CAR-SEARCH-003: 필터 조합 시 실시간으로 결과 수가 업데이트되어야 한다
- REQ-CAR-SEARCH-004: 검색 결과는 10개씩 페이지네이션되어야 한다

**기술 명세:**
- Elasticsearch를 활용한 검색 엔진
- 복합 필터링 지원
- 검색 쿼리 캐싱 (Redis)
- 최근 검색어 저장 (로컬 스토리지)

#### 3.2.4 데이터 모델

**Property (부동산 매물) 테이블:**
```sql
CREATE TABLE properties (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  property_type ENUM('studio', 'one_room', 'two_room', 'three_room', 'officetel', 'apartment') NOT NULL,
  deposit_amount INT NOT NULL,
  monthly_rent INT NOT NULL,
  maintenance_fee INT DEFAULT 0,
  area_size DECIMAL(5,2) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  floor_info VARCHAR(50),
  building_year INT,
  parking_available BOOLEAN DEFAULT FALSE,
  elevator_available BOOLEAN DEFAULT FALSE,
  pet_allowed BOOLEAN DEFAULT FALSE,
  status ENUM('available', 'reserved', 'rented') DEFAULT 'available',
  owner_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Car (중고차) 테이블:**
```sql
CREATE TABLE cars (
  id VARCHAR(36) PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  price INT NOT NULL,
  mileage INT NOT NULL,
  fuel_type ENUM('gasoline', 'diesel', 'hybrid', 'electric') NOT NULL,
  transmission ENUM('automatic', 'manual') NOT NULL,
  engine_size VARCHAR(20),
  color VARCHAR(50),
  description TEXT,
  address VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  accident_history BOOLEAN DEFAULT FALSE,
  insurance_history TEXT,
  features JSON, -- Navigation, Sunroof, Leather, etc.
  seller_type ENUM('dealer', 'individual') DEFAULT 'individual',
  seller_id VARCHAR(36) NOT NULL,
  status ENUM('available', 'reserved', 'sold') DEFAULT 'available',
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Favorites (찜하기) 테이블:**
```sql
CREATE TABLE favorites (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  item_type ENUM('property', 'car') NOT NULL,
  item_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, item_type, item_id)
);
```

### 3.3 사용자 스토리

#### 3.3.1 매물 검색 사용자 스토리

**Epic**: 외국인 사용자가 원하는 조건의 매물을 쉽게 찾는다

**User Story 1**: 지역 기반 매물 검색
```
As a: 서울에 거주할 외국인
I want to: 지하철역 근처의 원룸을 검색하고 싶다
So that: 출퇴근이 편리한 곳에서 살 수 있다

Acceptance Criteria:
- 지하철역명으로 검색 가능
- 역 주변 반경 1km 내 매물 표시
- 도보 거리 정보 제공
- 가격대별 필터 적용 가능
```

**User Story 2**: 예산 기반 매물 필터링
```
As a: 예산이 한정된 외국인 학생
I want to: 보증금 1000만원, 월세 50만원 이하의 매물만 보고 싶다
So that: 내 예산에 맞는 매물만 효율적으로 찾을 수 있다

Acceptance Criteria:
- 슬라이더로 가격 범위 설정 가능
- 관리비 포함/제외 옵션 선택 가능
- 필터 적용 시 실시간 결과 수 표시
- 저장된 검색 조건으로 알림 설정 가능
```

**User Story 3**: 중고차 검색 및 필터링
```
As a: 한국에서 차를 구매하려는 외국인
I want to: 예산과 조건에 맞는 중고차를 검색하고 싶다
So that: 신뢰할 수 있는 차량을 효율적으로 찾을 수 있다

Acceptance Criteria:
- 브랜드, 가격, 연식, 주행거리로 필터링 가능
- 안전 정보(사고 이력, 보험 이력) 확인 가능
- 차량 옵션 및 특징 확인 가능
- 판매자 정보 및 평점 확인 가능
```

**User Story 4**: 통합 찜 목록 관리
```
As a: 부동산과 중고차를 모두 관심 있는 외국인
I want to: 관심 있는 부동산과 중고차를 하나의 목록에서 관리하고 싶다
So that: 쉽게 비교하고 선택할 수 있다

Acceptance Criteria:
- 부동산과 중고차를 통합 찜 목록에서 확인 가능
- 카테고리별 필터링 (All/House/Car) 가능
- 사용 가능 매물만 보기 옵션
- 찜한 항목에서 바로 상세 페이지 이동 가능
```

---

## 4. 비기능 요구사항

### 4.1 성능 요구사항

**응답 시간:**
- 앱 시작 시간: 3초 이내
- 검색 결과 로딩: 2초 이내
- 매물 상세 페이지 로딩: 1.5초 이내
- 이미지 로딩: 5초 이내 (고해상도)

**처리량:**
- 동시 사용자: 1,000명 (1년 내 목표)
- 초당 검색 요청: 100 QPS
- 초당 매물 조회: 500 QPS

**용량:**
- 부동산 매물 데이터: 10만 건 (1년 내 목표)
- 중고차 매물 데이터: 5만 건 (1년 내 목표)
- 이미지 저장: 1.5TB (CDN 활용)
- 데이터베이스: 150GB

### 4.2 보안 요구사항

**데이터 보호:**
- 개인정보 암호화 (AES-256)
- 전송 중 데이터 보호 (TLS 1.3)
- 정기적 보안 감사 및 취약점 점검

**접근 제어:**
- RBAC (Role-Based Access Control) 구현
- API Rate Limiting (사용자당 분당 60회 요청)
- 민감한 개인정보 접근 로그 관리

**데이터 정책:**
- GDPR 및 개인정보보호법 준수
- 사용자 데이터 삭제권 보장
- 데이터 최소 수집 원칙

### 4.3 확장성 및 가용성

**확장성:**
- 수평적 확장 가능한 마이크로서비스 아키텍처
- 로드밸런서를 통한 트래픽 분산
- 데이터베이스 샤딩 준비

**가용성:**
- 99.9% 업타임 목표 (월 43분 이하 다운타임)
- 무중단 배포 시스템 구축
- 자동 장애 복구 메커니즘

**백업 및 복구:**
- 일일 자동 백업
- 포인트인타임 복구 (7일간)
- 재해 복구 계획 (RTO: 4시간, RPO: 1시간)

---

## 5. 기술 아키텍처

### 5.1 시스템 구조도

```
[Mobile App (React Native)]
        ↓ HTTPS/WSS
[Load Balancer (CloudFlare)]
        ↓
[API Gateway (Express.js/Fastify)]
        ↓
┌─────────────────────────────────┐
│     Microservices               │
├─ User Service (Node.js)         │
├─ Property Service (Node.js)     │
├─ Car Service (Node.js)          │
├─ Search Service (Node.js)       │
├─ Chat Service (Socket.io)       │
└─ Notification Service (Node.js) │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│     Data Layer                  │
├─ PostgreSQL (Main DB)           │
├─ Redis (Cache/Session)          │
├─ Elasticsearch (Search)         │
└─ AWS S3 (File Storage)          │
└─────────────────────────────────┘
```

### 5.2 기술 스택 선택 근거

**Frontend (Mobile App):**
- **React Native + Expo + Expo Router**: 
  - 빠른 프로토타이핑과 크로스플랫폼 개발
  - 기존 웹 개발 경험 활용 가능
  - OTA 업데이트로 빠른 배포
  - Stack Navigation 기반 파일 시스템 라우팅
  - 타입 안전한 네비게이션

**Backend:**
- **Node.js + TypeScript**:
  - 풀스택 JavaScript/TypeScript로 개발 효율성 극대화
  - 실시간 기능(채팅) 구현에 유리
  - 빠른 개발과 배포

**Database:**
- **PostgreSQL**: 
  - ACID 보장으로 데이터 일관성 확보
  - 공간 데이터(PostGIS) 지원으로 지도 기능 구현
  - JSON 타입으로 유연한 스키마
- **Redis**: 
  - 세션 관리 및 캐싱
  - 실시간 채팅 데이터 임시 저장
- **Elasticsearch**:
  - 고성능 검색 기능
  - 복합 필터링 및 자동완성

**Infrastructure:**
- **AWS**: 확장성과 안정성
- **Docker + Kubernetes**: 컨테이너화 및 오케스트레이션
- **CloudFlare**: CDN 및 DDoS 보호

### 5.3 데이터 모델

#### 5.3.1 ERD (Entity Relationship Diagram)

```
Users                    Properties                 PropertyImages
┌─────────────┐         ┌─────────────────┐        ┌──────────────┐
│ id (PK)     │──┐   ┌──│ id (PK)         │        │ id (PK)      │
│ email       │  │   │  │ title           │   ┌────│ property_id  │
│ name        │  │   │  │ description     │   │    │ image_url    │
│ phone       │  │   │  │ property_type   │   │    │ order_seq    │
│ profile_img │  │   │  │ deposit_amount  │   │    └──────────────┘
│ created_at  │  │   │  │ monthly_rent    │   │
└─────────────┘  │   │  │ area_size       │   │    Cars
                 │   │  │ address         │   │    ┌──────────────┐
Favorites        │   │  │ latitude        │   │    │ id (PK)      │
┌─────────────┐  │   │  │ longitude       │   │    │ brand        │
│ id (PK)     │  │   │  │ owner_id (FK)   │───┘    │ model        │
│ user_id (FK)│──┘   │  │ created_at      │        │ year         │
│item_type    │──────┘  └─────────────────┘        │ price        │
│item_id      │                                    │ mileage      │
│ created_at  │                                    │ seller_id(FK)│
└─────────────┘                                    └──────────────┘
```

#### 5.3.2 API 설계

**RESTful API 엔드포인트:**

```typescript
// 부동산 매물 관련 API
GET    /api/properties              // 매물 목록 조회
GET    /api/properties/:id          // 매물 상세 조회
POST   /api/properties              // 매물 등록 (인증 필요)
PUT    /api/properties/:id          // 매물 수정 (소유자만)
DELETE /api/properties/:id          // 매물 삭제 (소유자만)

// 중고차 관련 API
GET    /api/cars                    // 중고차 목록 조회
GET    /api/cars/:id                // 중고차 상세 조회
POST   /api/cars                    // 중고차 등록 (인증 필요)
PUT    /api/cars/:id                // 중고차 수정 (소유자만)
DELETE /api/cars/:id                // 중고차 삭제 (소유자만)

// 검색 관련 API
GET    /api/search/properties       // 부동산 검색
GET    /api/search/cars             // 중고차 검색
GET    /api/search/autocomplete     // 검색 자동완성
POST   /api/search/saved            // 검색 조건 저장 (인증 필요)

// 사용자 관련 API
POST   /api/auth/google             // Google OAuth 로그인
POST   /api/auth/refresh            // 토큰 갱신
GET    /api/users/profile           // 프로필 조회 (인증 필요)
PUT    /api/users/profile           // 프로필 수정 (인증 필요)

// 즐겨찾기 관련 API
GET    /api/favorites               // 찜 목록 조회 (인증 필요, 통합)
POST   /api/favorites               // 찜 추가 (인증 필요, item_type, item_id)
DELETE /api/favorites/:id          // 찜 해제 (인증 필요)

// 채팅 관련 API
GET    /api/chat                    // 채팅 목록 조회 (인증 필요)
GET    /api/chat/:id                // 채팅방 조회 (인증 필요)
POST   /api/chat/:id/messages       // 메시지 전송 (인증 필요)

// 문의 관련 API
POST   /api/inquiries               // 매물/차량 문의 (인증 필요)
GET    /api/inquiries               // 내 문의 목록 (인증 필요)
```

---

## 6. 사용자 경험

### 6.1 사용자 플로우

#### 6.1.1 신규 사용자 온보딩 플로우

```
앱 실행 → 스플래시 화면 (2초) → 온보딩 슬라이드 (3개) → 
서비스 둘러보기 (비로그인) → 관심 매물 발견 → 로그인 유도 → 
Google 로그인 → 기본 프로필 설정 → 메인 화면
```

**세부 플로우:**
1. **스플래시 화면** (2초)
   - 앱 로고 및 로딩 인디케이터
   - 필수 데이터 프리로딩

2. **온보딩 슬라이드** (3개, 각 5초)
   - "Find your perfect room" - 매물 검색 강조
   - "Chat directly with owners" - 직접 소통 강조  
   - "Trusted by foreigners" - 신뢰성 강조

3. **둘러보기 모드**
   - 로그인 없이 검색/조회 가능
   - 찜하기, 문의하기 시 로그인 유도

#### 6.1.2 부동산 검색 플로우

```
홈 화면 → House 카드 탭 → House Map (/house) → 
검색 바 탭 → Search Screen (/house/search) → 
검색어 입력/선택 → 결과 필터링 → 
Property Card 탭 → Property Detail (/house/[id]) →
Chat Inquiry → Chat Room (/chat/[id])
```

**검색 옵션:**
- **빠른 검색**: 지역명/역명 입력 (/house/search)
- **지도 검색**: 지도에서 직접 영역 선택 (/house)
- **리스트 뷰**: 리스트 형식으로 매물 확인 (/house/list)
- **상세 필터**: 가격, 거래 유형, 면적 조합 (Bottom Sheet)

#### 6.1.3 중고차 검색 플로우

```
홈 화면 → Car 카드 탭 → Car List (/car) → 
필터 적용 또는 Search → Car Card 탭 → 
Car Detail (/car/[id]) → Chat Inquiry → Chat Room (/chat/[id])
```

**검색 옵션:**
- **빠른 검색**: 모델명/브랜드/연식 입력 (/car/search)
- **고급 필터**: 브랜드, 가격, 연식, 주행거리, 연료, 변속기 (Bottom Sheet)
- **리스트 뷰**: 스크롤 가능한 차량 목록

### 6.2 UI/UX 가이드라인

#### 6.2.1 디자인 시스템

**컬러 팔레트:**
```css
/* Primary Colors */
--primary-blue: #2196F3;      /* 메인 액션 버튼 */
--primary-dark: #1976D2;      /* 버튼 호버 상태 */
--primary-light: #E3F2FD;     /* 배경 하이라이트 */

/* Secondary Colors */
--secondary-gray: #757575;     /* 보조 텍스트 */
--secondary-light: #F5F5F5;    /* 배경색 */

/* Semantic Colors */
--success-green: #4CAF50;      /* 성공 메시지 */
--error-red: #F44336;          /* 에러 메시지 */
--warning-orange: #FF9800;     /* 경고 메시지 */
```

**타이포그래피:**
```css
/* Headings */
h1: 24px, font-weight: 700, line-height: 32px
h2: 20px, font-weight: 600, line-height: 28px
h3: 18px, font-weight: 600, line-height: 24px

/* Body Text */
body: 16px, font-weight: 400, line-height: 24px
small: 14px, font-weight: 400, line-height: 20px
caption: 12px, font-weight: 400, line-height: 16px
```

**컴포넌트 가이드:**
- **버튼**: 최소 터치 영역 44px × 44px
- **카드**: 8px 모서리 라운딩, 2px 그림자
- **입력 필드**: 48px 높이, 12px 내부 패딩

#### 6.2.2 핵심 화면 와이어프레임

**1. 메인 화면 (홈) - 카테고리 선택**
```
┌─────────────────────────────┐
│ [👤 Avatar] House [❤️] [🔔] │ Header (60px)
├─────────────────────────────┤
│                             │
│   What are you looking for? │ Welcome Section
│                             │
│  ┌─────────────────────┐   │
│  │      🏠 HOUSE       │   │ Category Card
│  │  Find your home     │   │ → /house
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │      🚗 CAR         │   │ Category Card
│  │  Find your car      │   │ → /car
│  └─────────────────────┘   │
│                             │
│  ┌─────┐ ┌─────┐ ┌─────┐   │ Quick Stats
│  │12.5k│ │5.2k │ │ 25+ │   │
│  │List │ │Users│ │City │   │
│  └─────┘ └─────┘ └─────┘   │
│                             │
│      Recent Activity        │ Activity Section
│                             │
└─────────────────────────────┘
```
**참고**: Stack Navigation 구조로 Bottom Tab이 없음

**2. 부동산 지도 화면 (/house)**
```
┌─────────────────────────────┐
│ [← Back] House        [❤️]  │ Header
├─────────────────────────────┤
│ 📍 Pyeongchang-gun      ▼   │ Location Bar
├─────────────────────────────┤
│ 🔍 Search location...       │ Search Bar → /house/search
├─────────────────────────────┤
│ [Price▼][Real Trans][Area▼] │ Filter Chips
├─────────────────────────────┤
│ [🗺️ Map] [📋 List]          │ View Toggle
├─────────────────────────────┤
│                             │
│      Interactive Map        │ Map Area
│      Property Markers       │
│                             │
│  ┌─────────────────────┐   │ Preview Card
│  │ Property Preview    │   │ (Bottom slide-up)
│  └─────────────────────┘   │
└─────────────────────────────┘
```

**3. 중고차 리스트 화면 (/car)**
```
┌─────────────────────────────┐
│ [← Back] Car          [❤️]  │ Header
├─────────────────────────────┤
│ 📍 Seoul, Korea         ▼   │ Location Bar
├─────────────────────────────┤
│ 🔍 Search car...            │ Search Bar → /car/search
├─────────────────────────────┤
│ [Brand][Price][Year][Fuel]  │ Filter Chips
├─────────────────────────────┤
│ Found 23 cars               │ Results Count
├─────────────────────────────┤
│ [Car Card]                  │ Car Cards
│ 📷 Hyundai Sonata 2022      │ (ScrollView)
│ ₩28,500,000                 │
│ 2022 • 35,000km • Gasoline  │
│ 👁️ 1,250  ❤️ 89            │
│                             │
└─────────────────────────────┘
```

### 6.3 접근성 고려사항

#### 6.3.1 국제 사용자 고려사항

**다국어 지원:**
- **1단계**: 영어 (100% 완성)
- **2단계**: 중국어 간체 (주요 화면)
- **3단계**: 일본어 (주요 화면)

**문화적 고려사항:**
- 가격 표시: 원화 + USD 환산 표시 옵션
- 면적 단위: 제곱미터 + 평수 병기 (부동산)
- 주행거리: 킬로미터 단위 (중고차)
- 교통 정보: 도보 거리 + 지하철역 정보 강조 (부동산)
- 연료 타입: Gasoline, Diesel, Hybrid, Electric (중고차)

#### 6.3.2 접근성 표준 준수

**WCAG 2.1 AA 레벨 준수:**
- 색상 대비비 4.5:1 이상 유지
- 터치 타겟 최소 크기 44×44px
- 스크린 리더 지원 (alt text, semantic HTML)
- 키보드 내비게이션 지원

---

## 7. 개발 계획

### 7.1 마일스톤 및 일정

#### 7.1.1 개발 로드맵 (총 6개월)

**Phase 1: MVP 개발 (2개월) - ✅ 완료**
- Week 1-2: 프로젝트 설정, 인프라 구축 ✅
- Week 3-4: Stack Navigation 구조, 기본 화면 구현 ✅
- Week 5-6: 부동산 모듈 (지도, 리스트, 검색, 상세) ✅
- Week 7-8: 중고차 모듈 (리스트, 검색, 상세) ✅
- Week 7-8: 찜하기, 채팅, 프로필 화면 ✅

**Phase 2: 핵심 기능 확장 (2개월) - 진행 중**  
- Week 9-10: 실제 지도 API 연동 (카카오맵/구글맵)
- Week 11-12: 백엔드 API 연동, 사용자 인증 시스템
- Week 13-14: 실시간 채팅 시스템 (Socket.io)
- Week 15-16: 이미지 업로드/표시, 푸시 알림

**Phase 3: 서비스 런칭 준비 (2개월)**
- Week 17-18: 성능 최적화, 보안 강화
- Week 19-20: 사용자 테스트, 버그 수정
- Week 21-22: 앱스토어 등록, 마케팅 준비
- Week 23-24: 소프트 런칭, 피드백 수집

#### 7.1.2 주요 마일스톤

**M1: MVP 완성 (8주차) - ✅ 완료**
- ✅ Stack Navigation 구조 완성
- ✅ 부동산 모듈 (지도, 리스트, 검색, 상세) 구현
- ✅ 중고차 모듈 (리스트, 검색, 상세) 구현
- ✅ 찜하기 기능 (통합 목록)
- ✅ 채팅 인터페이스 기본 구조
- ✅ 프로필 및 알림 화면
- ⏳ Google 로그인 (구현 예정)
- ⏳ 실제 API 연동 (구현 예정)
- 성공 지표: ✅ 기본 사용자 플로우 완성

**M2: 핵심 기능 완성 (16주차)**
- 모든 P0, P1 기능 구현
- 실시간 채팅 시스템
- 성능 최적화 완료
- 성공 지표: 베타 테스터 50명 확보

**M3: 런칭 준비 완료 (24주차)**
- 앱스토어 등록 승인
- 초기 마케팅 캠페인 준비
- 서버 확장성 검증 완료
- 성공 지표: 런칭 후 1주일 내 1000 다운로드

### 7.2 팀 구성 및 역할

#### 7.2.1 개발 팀 구성

**핵심 팀 (3명)**
- **Full-Stack Developer (Lead)**: 전체 아키텍처, 백엔드 개발
- **Frontend Developer**: React Native 앱 개발, UI/UX
- **Product Manager**: 기획, 사용자 리서치, QA

**확장 팀 (필요시 추가)**
- **DevOps Engineer**: 인프라, 배포 자동화
- **UI/UX Designer**: 디자인 시스템, 사용자 경험
- **마케터**: 런칭 준비, 사용자 확보

#### 7.2.2 개발 프로세스

**애자일 스크럼 방법론**
- 2주 스프린트
- 주 2회 스탠드업 미팅 (월, 목)
- 스프린트 회고 및 계획 (격주 금요일)

**코드 관리**
- Git Flow 전략
- Pull Request 기반 코드 리뷰
- 자동화된 테스트 및 배포

### 7.3 리스크 관리

#### 7.3.1 기술적 리스크

**높은 리스크:**
1. **확장성 문제**: 급격한 사용자 증가 시 서버 부하
   - 완화책: 클라우드 오토스케일링, CDN 활용
   - 대응책: 수평적 확장 가능한 아키텍처 설계

2. **데이터 품질**: 부정확한 매물 정보
   - 완화책: 매물 등록 시 필수 정보 검증
   - 대응책: 사용자 신고 시스템, 관리자 모니터링

**중간 리스크:**
1. **외부 API 의존성**: 카카오맵, Google 서비스
   - 완화책: API 사용량 모니터링, 대안 서비스 준비
   - 대응책: 서비스별 fallback 메커니즘

#### 7.3.2 비즈니스 리스크

**높은 리스크:**
1. **경쟁 서비스 출현**: 유사 서비스 런칭
   - 완화책: 빠른 MVP 출시, 사용자 피드백 반영
   - 대응책: 차별화 기능 지속 개발

2. **사용자 확보 어려움**: 타겟 사용자 부족
   - 완화책: 페이스북 그룹 기반 초기 사용자 확보
   - 대응책: 마케팅 전략 수정, 타겟 확장

---

## 8. 성공 지표

### 8.1 KPI 정의

#### 8.1.1 사용자 관련 지표

**핵심 지표 (North Star Metrics):**
- **월간 활성 사용자 (MAU)**: 월 10만명 (1년 목표)
- **일간 활성 사용자 (DAU)**: 일 5,000명 (6개월 목표)
- **사용자 유지율**: 30일 리텐션 40% (3개월 목표)

**세부 사용자 지표:**
- **신규 가입자**: 월 1만명
- **앱 설치 수**: 누적 50만 다운로드 (1년)
- **세션 길이**: 평균 8분
- **세션 빈도**: 사용자당 주 3회

#### 8.1.2 비즈니스 관련 지표

**매물 관련:**
- **부동산 등록 수**: 월 1,000건 신규 등록
- **중고차 등록 수**: 월 500건 신규 등록
- **활성 부동산 매물 수**: 상시 5,000건 유지
- **활성 중고차 매물 수**: 상시 2,500건 유지
- **매물 조회수**: 월 100만 뷰 (부동산 + 중고차 통합)

**거래 관련:**
- **문의 생성률**: 매물 조회 대비 5%
- **응답률**: 문의 후 24시간 내 70%
- **성약률**: 문의 대비 10% (추정)

**수익 관련 (장기):**
- **프리미엄 매물 등록**: 월 100건
- **광고 수익**: 월 500만원 (1년 후)

#### 8.1.3 기술적 지표

**성능 지표:**
- **앱 로딩 시간**: 평균 3초 이하
- **검색 응답 시간**: 평균 1.5초 이하
- **서버 업타임**: 99.9% 이상
- **에러율**: 1% 이하

**품질 지표:**
- **앱스토어 평점**: 4.5/5.0 이상
- **크래시 발생률**: 0.1% 이하
- **사용자 만족도**: NPS 50 이상

### 8.2 측정 방법

#### 8.2.1 분석 도구 설정

**앱 분석:**
- **Firebase Analytics**: 사용자 행동, 이벤트 추적
- **Google Analytics**: 웹뷰 페이지 분석
- **Mixpanel**: 퍼널 분석, 코호트 분석

**성능 모니터링:**
- **Firebase Performance**: 앱 성능 모니터링
- **Sentry**: 에러 추적 및 성능 모니터링
- **DataDog**: 서버 인프라 모니터링

**사용자 피드백:**
- **앱스토어 리뷰**: 정성적 피드백
- **앱 내 피드백**: 간단한 만족도 조사
- **사용자 인터뷰**: 월 10명 대상 심층 인터뷰

#### 8.2.2 추적 이벤트 정의

**핵심 사용자 이벤트:**
```javascript
// 사용자 행동 이벤트
'user_signup'              // 회원가입
'user_login'               // 로그인
'home_category_selected'   // 홈에서 카테고리 선택 (House/Car)
'property_search'          // 부동산 검색
'car_search'               // 중고차 검색
'property_view'            // 부동산 상세 조회
'car_view'                 // 중고차 상세 조회
'favorite_added'           // 찜하기 (통합)
'favorite_removed'         // 찜 해제
'inquiry_send'             // 문의 전송
'chat_message_sent'        // 채팅 메시지 전송

// 비즈니스 이벤트
'property_posted'          // 부동산 등록
'car_posted'               // 중고차 등록
'inquiry_received'         // 문의 수신
'inquiry_replied'          // 문의 응답
```

**퍼널 분석:**
```
앱 설치 → 첫 실행 → 카테고리 선택 → 검색 → 매물 조회 → 문의 → 응답 수신
   100% → 70% → 60% → 50% → 30% → 5% → 3%
```

### 8.3 목표 수치

#### 8.3.1 단계별 목표

**MVP 런칭 후 1개월:**
- DAU: 500명
- MAU: 2,000명
- 부동산 등록: 100건/월
- 중고차 등록: 50건/월
- 앱 다운로드: 5,000건

**런칭 후 3개월:**
- DAU: 2,000명  
- MAU: 8,000명
- 부동산 등록: 500건/월
- 중고차 등록: 250건/월
- 문의 수: 1,000건/월

**런칭 후 6개월:**
- DAU: 5,000명
- MAU: 20,000명
- 부동산 등록: 1,000건/월
- 중고차 등록: 500건/월
- 문의 수: 3,000건/월

**런칭 후 1년:**
- DAU: 10,000명
- MAU: 50,000명
- 부동산 등록: 2,000건/월
- 중고차 등록: 1,000건/월
- 수익: 월 1,000만원

#### 8.3.2 성공 기준

**MVP 성공 기준:**
- ✅ 기본 사용자 플로우 완성
- ✅ 베타 테스터 50명 확보
- ✅ 주요 기능 에러율 1% 이하

**서비스 성공 기준 (6개월):**
- ✅ MAU 20,000명 달성
- ✅ 앱스토어 평점 4.0 이상
- ✅ 월 부동산 등록 1,000건 달성
- ✅ 월 중고차 등록 500건 달성
- ✅ 사용자 리텐션 30일 30% 이상

**장기 성공 기준 (1년):**
- ✅ MAU 50,000명 달성  
- ✅ 월 수익 1,000만원 달성
- ✅ 경쟁 서비스 대비 차별화 확립
- ✅ 중고거래 기능 확장 준비 완료

---

**문서 승인:**
- **작성자**: [이름]
- **검토자**: [이름]  
- **승인자**: [이름]
- **최종 승인일**: [날짜]

**변경 이력:**
- v1.0 (2024.XX.XX): 초기 PRD 작성 (부동산 중심)
- v2.0 (2024.XX.XX): 현재 구현 기반 업데이트
  - 중고차(Car) 모듈 추가
  - Stack Navigation 구조 반영
  - 통합 찜하기 기능 추가
  - 현재 구현된 화면 구조 반영
  - 데이터 모델 확장 (Car, Favorites)
  - API 설계 업데이트