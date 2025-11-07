# 데이터베이스 스키마

## 1. 문서 개요

### 1.1 목적

이 문서는 부동산 서비스의 데이터베이스 스키마를 정의합니다.

### 1.2 범위

-   데이터 모델 정의
-   테이블 구조
-   관계 정의
-   제약 조건

## 2. 데이터 모델

### 2.1 사용자 (User)

**설명**: 서비스 사용자 정보

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

**필드 설명:**

-   `id`: 사용자 고유 식별자
-   `email`: 이메일 주소
-   `phone`: 전화번호 (선택)
-   `name`: 이름
-   `profileImage`: 프로필 이미지 URL (선택)
-   `userType`: 사용자 유형 ('tenant': 임차인, 'agent': 부동산업자)
-   `createdAt`: 생성 일시
-   `updatedAt`: 수정 일시

### 2.2 매물 (Property)

**설명**: 부동산 매물 정보

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

**필드 설명:**

-   `id`: 매물 고유 식별자
-   `userId`: 등록자 ID (부동산업자)
-   `title`: 매물 제목
-   `description`: 매물 설명
-   `propertyType`: 매물 유형 ('oneroom': 원룸, 'tworoom': 투룸, 'threeroom': 쓰리룸, 'officetel': 오피스텔, 'apartment': 아파트)
-   `address`: 주소 정보
    -   `fullAddress`: 전체 주소
    -   `sido`: 시/도
    -   `sigungu`: 시/군/구
    -   `dong`: 동
    -   `lat`: 위도
    -   `lng`: 경도
-   `price`: 가격 정보
    -   `deposit`: 보증금
    -   `monthlyRent`: 월세
    -   `maintenanceFee`: 관리비
-   `area`: 면적 (평수 또는 m²)
-   `floor`: 층수
-   `buildingFloor`: 건물 총 층수
-   `buildingYear`: 건축년도 (선택)
-   `images`: 이미지 URL 배열
-   `options`: 옵션 정보
    -   `parking`: 주차 가능 여부
    -   `elevator`: 엘리베이터 여부
    -   `pet`: 반려동물 가능 여부
-   `status`: 매물 상태 ('available': 거래 가능, 'reserved': 예약중, 'sold': 거래 완료)
-   `views`: 조회수
-   `likes`: 찜 수
-   `createdAt`: 생성 일시
-   `updatedAt`: 수정 일시

### 2.3 관심 매물 (Favorite)

**설명**: 사용자가 찜한 매물 정보

```typescript
{
    id: string;
    userId: string;
    propertyId: string;
    createdAt: Date;
}
```

**필드 설명:**

-   `id`: 관심 매물 고유 식별자
-   `userId`: 사용자 ID
-   `propertyId`: 매물 ID
-   `createdAt`: 생성 일시

**관계:**

-   `userId` → `User.id`
-   `propertyId` → `Property.id`

### 2.4 문의 (Inquiry)

**설명**: 매물에 대한 문의 정보

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

**필드 설명:**

-   `id`: 문의 고유 식별자
-   `propertyId`: 매물 ID
-   `userId`: 문의한 사용자 ID
-   `message`: 문의 메시지
-   `status`: 문의 상태 ('pending': 대기, 'answered': 답변 완료, 'closed': 종료)
-   `createdAt`: 생성 일시

**관계:**

-   `propertyId` → `Property.id`
-   `userId` → `User.id`

## 3. 데이터베이스 관계

### 3.1 사용자와 매물

-   **관계**: 1:N (한 사용자가 여러 매물을 등록할 수 있음)
-   **외래 키**: `Property.userId` → `User.id`

### 3.2 사용자와 관심 매물

-   **관계**: 1:N (한 사용자가 여러 매물을 찜할 수 있음)
-   **외래 키**: `Favorite.userId` → `User.id`

### 3.3 매물과 관심 매물

-   **관계**: 1:N (한 매물이 여러 사용자에게 찜될 수 있음)
-   **외래 키**: `Favorite.propertyId` → `Property.id`

### 3.4 매물과 문의

-   **관계**: 1:N (한 매물에 여러 문의가 있을 수 있음)
-   **외래 키**: `Inquiry.propertyId` → `Property.id`

### 3.5 사용자와 문의

-   **관계**: 1:N (한 사용자가 여러 문의를 할 수 있음)
-   **외래 키**: `Inquiry.userId` → `User.id`

## 4. 인덱스

### 4.1 사용자 테이블

-   `email`: UNIQUE 인덱스
-   `phone`: UNIQUE 인덱스 (NULL 제외)
-   `userType`: 인덱스

### 4.2 매물 테이블

-   `userId`: 인덱스
-   `propertyType`: 인덱스
-   `status`: 인덱스
-   `address.lat`, `address.lng`: 공간 인덱스 (지도 검색용)
-   `createdAt`: 인덱스 (최신순 정렬용)

### 4.3 관심 매물 테이블

-   `userId`: 인덱스
-   `propertyId`: 인덱스
-   `userId`, `propertyId`: 복합 UNIQUE 인덱스 (중복 찜 방지)

### 4.4 문의 테이블

-   `propertyId`: 인덱스
-   `userId`: 인덱스
-   `status`: 인덱스
-   `createdAt`: 인덱스

## 5. 제약 조건

### 5.1 사용자 테이블

-   `email`: NOT NULL, UNIQUE
-   `name`: NOT NULL
-   `userType`: NOT NULL, CHECK ('tenant' OR 'agent')

### 5.2 매물 테이블

-   `userId`: NOT NULL, FOREIGN KEY
-   `title`: NOT NULL
-   `propertyType`: NOT NULL, CHECK ('oneroom' OR 'tworoom' OR 'threeroom' OR 'officetel' OR 'apartment')
-   `status`: NOT NULL, CHECK ('available' OR 'reserved' OR 'sold')
-   `deposit`: NOT NULL, >= 0
-   `monthlyRent`: NOT NULL, >= 0
-   `maintenanceFee`: NOT NULL, >= 0
-   `area`: NOT NULL, > 0
-   `floor`: NOT NULL, >= 0
-   `buildingFloor`: NOT NULL, > 0
-   `views`: NOT NULL, >= 0
-   `likes`: NOT NULL, >= 0

### 5.3 관심 매물 테이블

-   `userId`: NOT NULL, FOREIGN KEY
-   `propertyId`: NOT NULL, FOREIGN KEY
-   `userId`, `propertyId`: UNIQUE (중복 찜 방지)

### 5.4 문의 테이블

-   `propertyId`: NOT NULL, FOREIGN KEY
-   `userId`: NOT NULL, FOREIGN KEY
-   `message`: NOT NULL
-   `status`: NOT NULL, CHECK ('pending' OR 'answered' OR 'closed')

## 6. Prisma 스키마 예시

```prisma
model User {
  id          String    @id @default(uuid())
  email       String    @unique
  phone       String?   @unique
  name        String
  profileImage String?
  userType    UserType  @default(TENANT)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  properties  Property[]
  favorites   Favorite[]
  inquiries   Inquiry[]
}

enum UserType {
  TENANT
  AGENT
}

model Property {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  title         String
  description   String
  propertyType  PropertyType
  fullAddress   String
  sido          String
  sigungu       String
  dong          String
  lat           Float
  lng           Float
  deposit       Int
  monthlyRent   Int
  maintenanceFee Int
  area          Float
  floor         Int
  buildingFloor Int
  buildingYear  Int?
  images        String[]
  parking       Boolean     @default(false)
  elevator      Boolean     @default(false)
  pet           Boolean     @default(false)
  status        PropertyStatus @default(AVAILABLE)
  views         Int         @default(0)
  likes         Int         @default(0)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  favorites     Favorite[]
  inquiries     Inquiry[]

  @@index([userId])
  @@index([propertyType])
  @@index([status])
  @@index([lat, lng])
  @@index([createdAt])
}

enum PropertyType {
  ONEROOM
  TWOROOM
  THREEROOM
  OFFICETEL
  APARTMENT
}

enum PropertyStatus {
  AVAILABLE
  RESERVED
  SOLD
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  propertyId String
  property  Property @relation(fields: [propertyId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, propertyId])
  @@index([userId])
  @@index([propertyId])
}

model Inquiry {
  id        String      @id @default(uuid())
  propertyId String
  property  Property    @relation(fields: [propertyId], references: [id])
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  message   String
  status    InquiryStatus @default(PENDING)
  createdAt DateTime    @default(now())

  @@index([propertyId])
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

enum InquiryStatus {
  PENDING
  ANSWERED
  CLOSED
}
```

---

**작성일**: 2024년
**버전**: 1.0
**업데이트**: 프로젝트 진행에 따라 지속적으로 업데이트
