# Information Architecture (IA) 문서
# 외국인 전용 부동산/중고차 매물 플랫폼

> **작성일**: 2024년
> **버전**: 2.0 (현재 구현 기반 업데이트)
> **프로젝트명**: House & Car Platform
> **관련 문서**: [PRD.md](./PRD.md)

---

## 1. 문서 개요

### 1.1 목적
이 문서는 외국인 전용 부동산/중고차 매물 플랫폼의 정보 구조(Information Architecture)를 정의하며, 사용자가 서비스를 직관적이고 효율적으로 이용할 수 있도록 화면 구성, 내비게이션 플로우, 정보 계층을 체계화합니다.

### 1.2 설계 원칙
- **Simple & Clean**: 직방 대비 80% 간소화된 구조
- **Foreign-First**: 외국인 사용자 우선 설계
- **Mobile-Optimized**: 모바일 중심 인터페이스
- **Progressive Disclosure**: 단계별 정보 공개

---

## 2. 전체 앱 구조

### 2.1 기본 레이아웃

```
┌─────────────────────────────────────┐
│              Header Area            │ <- 60px
│  Back Button + Title + Actions      │
├─────────────────────────────────────┤
│                                     │
│            Content Area             │ <- Flexible
│       (Stack Navigation 기반)        │
│                                     │
└─────────────────────────────────────┘
```

### 2.2 Stack Navigation (Expo Router)

현재 구현된 앱은 **Stack Navigation** 구조를 사용합니다 (Bottom Tab이 아님).

| 화면 경로 | 파일 | 주요 기능 | 우선순위 |
|----------|------|---------|---------|
| / | app/index.tsx | 카테고리 선택 홈 | P0 |
| /house | app/house/index.tsx | 부동산 지도 검색 | P0 |
| /house/list | app/house/list.tsx | 부동산 리스트 보기 | P0 |
| /house/search | app/house/search.tsx | 부동산 검색 | P0 |
| /house/[id] | app/house/[id].tsx | 부동산 상세 | P0 |
| /car | app/car/index.tsx | 중고차 리스트 | P0 |
| /car/search | app/car/search.tsx | 중고차 검색 | P0 |
| /car/[id] | app/car/[id].tsx | 중고차 상세 | P0 |
| /saved | app/saved.tsx | 찜 목록 | P1 |
| /profile | app/profile.tsx | 사용자 프로필 | P1 |
| /myprofile | app/myprofile.tsx | 내 프로필 관리 | P1 |
| /chat | app/chat/index.tsx | 채팅 목록 | P0 |
| /chat/[id] | app/chat/[id].tsx | 채팅방 | P0 |
| /notifications | app/notifications.tsx | 알림 | P1 |

---

## 3. 화면별 상세 IA

### 3.1 홈 화면 (/)

#### 3.1.1 화면 구조
```
Home Screen (Category Selection)
├── Header (60px)
│   ├── Profile Avatar (좌측) - 프로필 이동
│   ├── App Title "House" (중앙)
│   └── Action Buttons (우측)
│       ├── Heart Icon - 찜 목록
│       └── Bell Icon - 알림
├── Welcome Section
│   └── "What are you looking for?"
├── Category Cards (주요 기능)
│   ├── House Card
│   │   ├── Home Icon
│   │   ├── "House"
│   │   └── Description text
│   └── Car Card
│       ├── Car Icon
│       ├── "Car"
│       └── Description text
├── Quick Stats Section
│   ├── Total Listings (구분된 카드)
│   ├── Active Users
│   └── Cities
└── Recent Activity (최근 활동)
    ├── Activity Items
    └── "View More" 링크
```

### 3.2 부동산 화면 (/house)

#### 3.2.1 지도 검색 화면 구조
```
House Map Screen
├── Header (60px)
│   ├── Back Button (좌측)
│   ├── "House" Title (중앙)
│   └── Heart Icon (우측) - 찜 목록
├── Location Bar
│   ├── MapPin Icon
│   ├── Current Location - "Pyeongchang-gun"
│   └── ChevronDown - 변경 옵션
├── Search Bar (터치 시 /house/search로 이동)
│   ├── Search Icon
│   └── "Search location or apartment..."
├── Quick Filters (수평 스크롤)
│   ├── "Price" (Slider 포함)
│   ├── "Real Transactions"
│   ├── "Area ㎡" (Slider 포함)
│   └── Reset Button
├── Filter Modal (Bottom Sheet, 80%)
│   ├── Header - "Filters"
│   ├── Overlay (터치 시 닫힘)
│   ├── Filter Options
│   │   ├── Transaction Type (실거래/매매/전세/월세)
│   │   ├── Price Range Sliders
│   │   └── Area Range Slider (㎡ 단위)
│   └── Action Buttons
│       ├── Reset (좌측)
│       └── Apply (우측)
├── View Toggle
│   ├── Map View Button (현재 활성)
│   └── List View Button (/house/list로 이동)
├── Map Area (Flexible)
│   ├── Interactive Map
│   ├── Property Markers (원형 가격 표시)
│   ├── Cluster Groups
│   └── Zoom Controls
└── Property Preview Cards (하단 슬라이드업)
    ├── Image (Camera placeholder)
    ├── Price Info - "Monthly Rent ₩XXXk"
    ├── Maintenance Fee
    ├── Location
    ├── Details
    └── Stats (Eye + Heart counts)
```

#### 3.2.2 부동산 리스트 화면 (/house/list)
```
House List Screen
├── Header (60px)
│   ├── Back Button
│   └── "House" Title
├── Results Count
│   └── "Found X properties"
├── Property List (ScrollView)
│   └── Property Cards
│       ├── Image Container (120px width)
│       │   ├── Camera Placeholder
│       │   └── Heart Button (filled red)
│       └── Card Content
│           ├── Price - "Monthly Rent ₩XXXk"
│           ├── Maintenance Fee - "₩XXk"
│           ├── Location
│           ├── Details (type, size, floor)
│           └── Stats Row
│               ├── Eye Icon + View Count
│               └── Heart Icon + Like Count
└── Empty State (결과 없을 때)
```

#### 3.2.3 부동산 검색 화면 (/house/search)
```
House Search Screen
├── Header
│   ├── Back Button
│   └── Search Input (autoFocus)
│       ├── Search Icon
│       ├── TextInput - "Search location or apartment..."
│       └── X Button (clear)
├── Recent Searches Section
│   ├── Section Header
│   │   ├── "Recent Searches"
│   │   └── "Clear All" Button
│   └── Search Items
│       ├── Clock Icon
│       ├── Search Text
│       └── X Button (remove)
└── Popular Searches Section
    ├── Section Header - "Popular Searches"
    └── Search Items
        ├── TrendingUp Icon (red)
        └── Search Text
```

#### 3.2.4 부동산 상세 화면 (/house/[id])
```
House Detail Screen
├── Header (60px)
│   ├── Back Button
│   ├── Title
│   └── Actions
│       ├── Share Button
│       └── Heart Toggle
├── Image Gallery (ScrollView horizontal)
│   ├── Swipeable Images (full width)
│   ├── Image Counter - "1/8"
│   └── Page Indicators (dots)
├── Basic Info Section
│   ├── Property Title
│   ├── Price Badge
│   ├── Price Details
│   │   ├── Deposit
│   │   ├── Monthly Rent
│   │   └── Maintenance Fee
│   └── Location with MapPin
├── Property Details Container (gray background)
│   ├── Info Rows
│   │   ├── Label: Value format
│   │   ├── Type (Studio/1Room/etc)
│   │   ├── Size (m²)
│   │   ├── Floor
│   │   └── Building Year
│   └── Dividers between rows
├── Location Section
│   ├── Section Title
│   ├── Full Address
│   └── Transportation Info
├── Features Section
│   ├── Section Title
│   └── Feature Grid (3 columns)
│       ├── Icon + Label format
│       ├── Parking
│       ├── Elevator
│       ├── Pet OK
│       ├── AC
│       └── etc.
├── Owner/Agent Information
│   ├── Avatar
│   ├── Name
│   ├── Rating
│   ├── Response Rate
│   └── Languages
└── Fixed Bottom Actions (80px)
    ├── Call Button (secondary)
    └── Chat Inquiry Button (primary, blue)
```

### 3.3 중고차 화면 (/car)

#### 3.3.1 중고차 리스트 화면 구조
```
Car List Screen
├── Header (60px)
│   ├── Back Button
│   ├── "Car" Title
│   └── Heart Icon - 찜 목록
├── Location Bar
│   ├── MapPin Icon
│   ├── "Seoul, Korea"
│   └── ChevronDown
├── Search Bar (터치 시 /car/search로 이동)
│   ├── Search Icon
│   └── "Search car..."
├── Quick Filters (수평 스크롤)
│   ├── "Brand" Chip
│   ├── "Price" Chip
│   ├── "Year" Chip
│   └── More Filters
├── Filter Modal (Bottom Sheet, 80%)
│   ├── Header - "Filters"
│   ├── Filter Options
│   │   ├── Brand Selection (buttons)
│   │   ├── Price Range (slider)
│   │   ├── Year Range (slider)
│   │   ├── Mileage (slider)
│   │   ├── Fuel Type (buttons)
│   │   └── Transmission (buttons)
│   └── Action Buttons
│       ├── Reset
│       └── Apply
├── Results Info
│   └── "Found X cars"
└── Car List (ScrollView)
    └── Car Cards
        ├── Image Container (120px)
        │   ├── Camera Placeholder
        │   └── Heart Button
        └── Card Content
            ├── Car Name
            ├── Price - "₩XX,XXX,XXX"
            ├── Year/Mileage/Fuel
            └── Stats Row
                ├── Eye + View Count
                └── Heart + Like Count
```

#### 3.3.2 중고차 검색 화면 (/car/search)
```
Car Search Screen
├── Header
│   ├── Back Button
│   └── Search Input (autoFocus)
│       ├── Search Icon
│       ├── TextInput - "Search car model, brand, or year"
│       └── X Button
├── Recent Searches Section
│   ├── "Recent Searches" + "Clear All"
│   └── Items
│       ├── Clock Icon
│       ├── "Hyundai Avante"
│       └── X (remove)
└── Popular Searches Section
    ├── "Popular Searches"
    └── Items
        ├── TrendingUp Icon (red)
        └── "Hyundai Sonata 2020"
```

#### 3.3.3 중고차 상세 화면 (/car/[id])
```
Car Detail Screen
├── Header (60px)
│   ├── Back Button
│   ├── Title
│   └── Share + Heart
├── Image Gallery
│   ├── Horizontal ScrollView
│   ├── Image Counter
│   └── Page Indicators
├── Basic Info
│   ├── Car Name + Year
│   ├── Price Badge
│   └── Basic Specs (Fuel, Transmission, Mileage)
├── Vehicle Details Container (gray box)
│   ├── Year
│   ├── Mileage
│   ├── Fuel Type
│   ├── Transmission
│   ├── Engine Size
│   └── Color
├── Safety Information Section
│   ├── Accident History (Shield icon)
│   └── Insurance Details (Wrench icon)
├── Features & Options Section
│   ├── Options Grid (3 columns)
│   └── Icon + Label items
│       ├── Navigation
│       ├── Sunroof
│       ├── Leather Seats
│       └── etc.
├── Seller Information
│   ├── Dealer/Individual Badge
│   ├── Avatar
│   ├── Name
│   ├── Rating (stars)
│   └── Response Rate
└── Fixed Bottom Actions (80px)
    ├── Call Button (Phone icon)
    └── Chat Inquiry Button (blue, primary)
```

### 3.4 찜 화면 (/saved)

#### 3.4.1 찜 목록 화면 구조
```
Saved Screen
├── Header (60px)
│   ├── Back Button
│   └── "My Favorites"
├── Filter Controls
│   ├── Checkbox - "Show Available Only"
│   └── Category Dropdown
│       ├── All
│       ├── House
│       └── Car
├── Saved Items List
│   └── Property/Car Cards (동일한 구조)
│       ├── Image + Heart (filled)
│       ├── Price Info
│       ├── Location/Details
│       ├── Status Badge (Available/Rented)
│       └── Stats (View + Like counts)
└── Empty State
    ├── Heart Icon (empty)
    ├── "No saved properties yet"
    ├── Description
    └── "Browse Properties" Button
```

### 3.5 채팅 화면 (/chat)

#### 3.5.1 채팅 목록 화면 구조
```
Chat List Screen
├── Header (60px)
│   └── "Messages"
└── Chat List
    └── Chat Room Items
        ├── Property/Car Thumbnail
        ├── Other User Name
        ├── Last Message Preview
        ├── Timestamp
        └── Unread Badge
```

#### 3.5.2 채팅방 화면 (/chat/[id])
```
Chat Room Screen
├── Header
│   ├── Back Button
│   ├── User Info
│   └── Property/Car Reference
├── Messages Area
│   ├── Date Separators
│   ├── Message Bubbles
│   │   ├── Sent (오른쪽, 파란색)
│   │   └── Received (왼쪽, 회색)
│   └── Timestamps
└── Input Area
    ├── TextInput
    └── Send Button
```

### 3.6 프로필 화면

#### 3.6.1 프로필 화면 구조 (/profile)
```
Profile Screen
├── Header
│   ├── Back Button
│   └── "Profile"
├── User Info Section
│   ├── Avatar
│   ├── Name
│   └── Email
├── Menu Items
│   ├── Edit Profile
│   ├── My Listings
│   ├── Settings
│   ├── Help & Support
│   └── Sign Out
└── App Version
```

### 3.7 알림 화면 (/notifications)

```
Notifications Screen
├── Header
│   ├── Back Button
│   └── "Notifications"
└── Notification List
    └── Notification Items
        ├── Icon
        ├── Title
        ├── Message
        └── Timestamp
```

---

## 4. 내비게이션 플로우

### 4.1 주요 사용자 여정

#### 4.1.1 부동산 검색 플로우
```
Home → House Card 탭 → House Map (/house) →
Search Bar 탭 → Search Screen (/house/search) →
검색어 입력 → 결과 필터링 → Property Card 탭 →
Property Detail (/house/[id]) →
Chat Inquiry → Chat Room (/chat/[id])
```

#### 4.1.2 중고차 검색 플로우
```
Home → Car Card 탭 → Car List (/car) →
Filter 적용 또는 Search → Car Card 탭 →
Car Detail (/car/[id]) →
Chat Inquiry → Chat Room (/chat/[id])
```

#### 4.1.3 찜 관리 플로우
```
Home → Heart Icon 또는 Profile → Saved Screen (/saved) →
Category Filter (All/House/Car) →
Available Only Toggle →
Item 탭 → Detail Screen
```

### 4.2 화면 전환 패턴

#### 4.2.1 Stack Navigation
```
Primary Navigation Stack (Expo Router):
/ (Home)
├── /house (Map View)
│   ├── /house/list (List View)
│   ├── /house/search (Search)
│   └── /house/[id] (Detail)
├── /car (List View)
│   ├── /car/search (Search)
│   └── /car/[id] (Detail)
├── /saved (Favorites)
├── /profile (User Profile)
├── /myprofile (Edit Profile)
├── /chat (Chat List)
│   └── /chat/[id] (Chat Room)
└── /notifications (Alerts)

Modal Presentations:
├── Filter Bottom Sheet (80% height)
├── Price Range Slider Modal
├── Category Dropdown
└── Image Gallery Full Screen
```

#### 4.2.2 Transition Animations
```
Screen Transitions:
├── Push/Pop (iOS style slide)
├── Bottom Sheet (Smooth slide up, 80% height)
├── Overlay (Fade in/out)
└── Modal Present (Center popup)

Micro-interactions:
├── Button Press (Scale + Opacity)
├── Heart Animation (Fill + Scale)
├── Image Gallery (Horizontal scroll snap)
├── Filter Chip (Background color change)
└── Checkbox Toggle (Check mark animation)
```

---

## 5. 정보 계층 구조

### 5.1 정보 우선순위 매트릭스

#### 5.1.1 홈 화면 정보 우선순위
```
Priority Level 1 (Critical):
└── Category Selection (House vs Car)

Priority Level 2 (High):
├── Quick Navigation to Favorites
└── Notifications Access

Priority Level 3 (Medium):
├── Quick Stats Overview
└── Recent Activity

Priority Level 4 (Low):
└── Welcome Message
```

#### 5.1.2 매물 카드 정보 우선순위
```
Visual Elements (30%):
└── Property/Car Image

Price Information (35%):
├── Primary Price (Monthly Rent / Car Price)
└── Secondary Fee (Maintenance / Year)

Property/Car Details (25%):
├── Type/Model
├── Size/Mileage
└── Location/Fuel

Engagement Metrics (10%):
├── View Count
└── Like Count
```

#### 5.1.3 상세 화면 정보 우선순위
```
Above the Fold (First View):
├── Image Gallery with Navigation
├── Price Information (prominent badge)
├── Basic Specs/Details
└── Quick Contact Actions

Below the Fold (Scroll to View):
├── Detailed Specifications (gray box)
├── Safety/Features Information
├── Seller/Agent Information
└── Similar Items (future)
```

### 5.2 컬러 시스템

```
Primary Colors:
├── House Theme: Blue (#2196F3)
├── Car Theme: Blue (#2196F3)
└── Accent: Red (#FF6B6B) for Hearts/Trending

UI Colors:
├── Background: White (#FFFFFF)
├── Card Background: White with Shadow
├── Gray Background: #f0f0f0, #f5f5f5, #f8f8f8
├── Text Primary: #333333
├── Text Secondary: #666666
├── Text Tertiary: #999999
└── Border: #f0f0f0

Button States:
├── Primary Active: #2196F3 (Blue)
├── Primary Disabled: Light Blue
├── Secondary: White with Border
└── Filter Active: #e3f2fd (Light Blue)
```

---

## 6. 외국인 친화적 IA 설계

### 6.1 언어 및 문화 고려사항

#### 6.1.1 용어 간소화 매핑
```
한국어 용어 → 영어 간소화
├── "전세/월세" → "Monthly Rent + Deposit"
├── "관리비" → "Maintenance Fee"
├── "원룸/투룸" → "Studio/One Room"
├── "평수" → "Size (m²)" - 제곱미터 단위 사용
├── "역세권" → "Near Station"
├── "실거래" → "Real Transactions"
├── "연식" → "Year"
├── "주행거리" → "Mileage"
└── "연료" → "Fuel Type"
```

#### 6.1.2 아이콘 및 시각적 표현
```
Universal Icons (Lucide React Native):
├── Home - 홈/부동산
├── Car - 자동차
├── Heart - 찜하기
├── MapPin - 위치
├── Search - 검색
├── ChevronLeft - 뒤로가기
├── Bell - 알림
├── Camera - 이미지 없음
├── Eye - 조회수
├── Phone - 전화
├── MessageCircle - 채팅
├── Share - 공유
├── Clock - 최근 검색
├── TrendingUp - 인기 검색
├── Check - 체크박스
├── X - 닫기/삭제
├── Filter - 필터
└── RotateCcw - 리셋
```

---

## 7. 컴포넌트 패턴

### 7.1 공통 UI 패턴

#### 7.1.1 필터 시스템
```
Filter Implementation Pattern:
├── Quick Filter Chips (horizontal scroll)
│   ├── Simple Style (no border)
│   ├── Gray Background (#f0f0f0)
│   ├── Dark Text (#333)
│   └── Border Radius (20px)
├── Filter Modal (Bottom Sheet)
│   ├── Height: 80%
│   ├── Overlay: rgba(0,0,0,0.5)
│   ├── Touch to Close
│   └── Reset + Apply Buttons
└── Slider Controls (Price/Area/Year)
    ├── Thumb Color: Blue (#2196F3)
    ├── Min/Max Labels
    └── Current Value Display
```

#### 7.1.2 카드 컴포넌트
```
Property/Car Card Pattern:
├── Horizontal Layout (flexDirection: 'row')
├── Image Container (120px width)
│   ├── Fixed aspect ratio
│   ├── Rounded corners (left side only)
│   └── Heart overlay button
├── Content Area (flex: 1)
│   ├── Title/Name
│   ├── Primary Price
│   ├── Secondary Info
│   ├── Details (1 line, ellipsis)
│   └── Stats Row (view + like counts)
└── Shadow + Border Radius (12px)
```

#### 7.1.3 검색 패턴
```
Search Screen Pattern:
├── Header with autoFocus TextInput
├── Recent Searches (user history)
│   ├── Clock Icon (gray)
│   ├── Remove Individual (X button)
│   └── Clear All button
└── Popular Searches (trending)
    ├── TrendingUp Icon (red)
    └── Tap to search
```

---

## 8. 기술 구현 상세

### 8.1 파일 구조 (Expo Router)

```
app/
├── _layout.tsx          # Root Stack Navigator
├── index.tsx            # Home (Category Selection)
├── saved.tsx            # Favorites List
├── profile.tsx          # User Profile
├── myprofile.tsx        # Edit Profile
├── notifications.tsx    # Notifications
├── modal.tsx            # Generic Modal
├── house/
│   ├── index.tsx        # Map Search View
│   ├── list.tsx         # List View
│   ├── search.tsx       # Search Screen
│   └── [id].tsx         # Detail Screen
├── car/
│   ├── index.tsx        # List View
│   ├── search.tsx       # Search Screen
│   └── [id].tsx         # Detail Screen
└── chat/
    ├── index.tsx        # Chat List
    └── [id].tsx         # Chat Room
```

### 8.2 상태 관리

```typescript
// Local Component State Pattern
interface FilterState {
  selectedFilters: string[];
  priceRange: [number, number];
  areaRange: [number, number];
  yearRange: [number, number];
  isModalVisible: boolean;
}

interface SearchState {
  searchText: string;
  recentSearches: string[];
  results: Item[];
}

interface ListState {
  items: Property[] | Car[];
  showAvailableOnly: boolean;
  selectedCategory: 'All' | 'House' | 'Car';
}
```

---

## 9. 향후 확장 고려사항

### 9.1 현재 구현된 기능
- House (부동산) 모듈: 지도 검색, 리스트, 검색, 상세
- Car (중고차) 모듈: 리스트, 검색, 상세
- 찜 목록 (카테고리 필터 포함)
- 채팅 시스템 기본 구조
- 프로필 및 알림

### 9.2 추가 예정 기능
- 실제 지도 API 연동 (현재 placeholder)
- 실제 이미지 업로드/표시
- 백엔드 API 연동
- 사용자 인증 시스템
- 푸시 알림
- 매물 등록 기능
- 검색 결과 저장
- 가격 변동 알림

---

## 부록

### A. 내비게이션 구조 (Expo Router)

```typescript
// app/_layout.tsx
RootNavigator (Stack)
├── index              # Home
├── house/index        # House Map
├── house/list         # House List
├── house/search       # House Search
├── house/[id]         # House Detail
├── car/index          # Car List
├── car/search         # Car Search
├── car/[id]           # Car Detail
├── saved              # Favorites
├── profile            # Profile
├── myprofile          # My Profile Edit
├── chat/index         # Chat List
├── chat/[id]          # Chat Room
├── notifications      # Notifications
└── modal              # Modal Screen
```

### B. 화면별 컴포넌트 매핑

```typescript
interface CommonComponents {
  header: {
    backButton: ChevronLeft;
    title: Text;
    actions: (Heart | Bell | Share)[];
  };
  filterChip: {
    text: Text;
    icon?: LucideIcon;
    backgroundColor: '#f0f0f0';
    borderRadius: 20;
  };
  propertyCard: {
    image: View | Image;
    heartButton: Heart;
    priceInfo: Text[];
    details: Text;
    stats: {
      views: Eye + number;
      likes: Heart + number;
    };
  };
  bottomSheet: {
    height: '80%';
    overlay: TouchableOpacity;
    content: ScrollView;
    actions: [Reset, Apply];
  };
}
```

---

**문서 정보:**
- **작성자**: 개발팀
- **검토자**: 프로덕트 매니저
- **승인자**: 프로젝트 리드
- **버전 관리**: Git으로 관리
- **업데이트 주기**: 스프린트별 검토 및 업데이트
- **최종 업데이트**: 현재 구현 기반 (Stack Navigation 구조)

**관련 문서:**
- [PRD.md](./PRD.md) - Product Requirements Document
- [기능명세서.md](./기능명세서.md) - 기능 상세 명세
- [화면기획서.md](./화면기획서.md) - UI/UX 가이드라인
