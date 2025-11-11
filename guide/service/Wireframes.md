# 로우 피델리티 와이어프레임 프로토타입
# 외국인 전용 부동산 매물 플랫폼 (P1 기능 범위)

> **작성일**: 2024년  
> **버전**: 1.0  
> **프로젝트명**: House (가칭)  
> **기능 범위**: P0(MVP) + P1(1차 확장) 기능  
> **관련 문서**: [IA.md](./IA.md), [PRD.md](./PRD.md)

---

## 1. 프로토타입 개요

### 1.1 포함 기능 범위

**P0 (MVP) 기능:**
- ✅ 사용자 인증 (Google OAuth)
- ✅ 기본 매물 검색
- ✅ 매물 상세 조회
- ✅ 기본 문의 기능

**P1 (1차 확장) 기능:**
- ✅ 고급 검색 필터
- ✅ 찜하기 기능
- ✅ 실시간 채팅
- ✅ 사용자 프로필 관리
- ✅ 저장된 검색 조건

### 1.2 와이어프레임 표기법

```
[Button] - 클릭 가능한 버튼
{Input} - 입력 필드
(Text) - 텍스트 표시
[Icon] - 아이콘
--- - 구분선
||| - 스크롤 영역
```

---

## 2. 핵심 화면 와이어프레임

### 2.1 홈 화면 (Home Screen)

```
┌─────────────────────────────────────┐
│ [☰] House            [🔔] [👤]     │ <- Header (60px)
├─────────────────────────────────────┤
│ 🔍 {Search location or station...} 🎤│ <- Search Bar (48px)
├─────────────────────────────────────┤
│ < [🚇Near][💰Under 500k][🏠Studio][⚙️More] > │ <- Quick Filters (50px)
├─────────────────────────────────────┤
│                                     │
│ (Recommended for you)          [>]  │ <- Section Header
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │ │ <- Property Cards
│ │ 💰500k  │ │ 💰700k  │ │ 💰400k  │ │    (Horizontal Scroll)
│ │ Hongdae │ │ Gangnam │ │ Itaewon │ │
│ │ Studio  │ │ 1Room   │ │ Studio  │ │
│ │    [❤️] │ │    [❤️] │ │    [❤️] │ │
│ └─────────┘ └─────────┘ └─────────┘ │
│                                     │
│ (Popular near you)             [>]  │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰800k/month    [❤️]│ │ <- Full Width Cards
│ │ Mapo-gu • 2min to Hongik Univ.   │ │    (Vertical Scroll)
│ │ Studio • 20m² • 3rd floor         │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰650k/month    [❤️]│ │
│ │ Gangnam-gu • 5min to Gangnam Stn │ │
│ │ 1Room • 25m² • 2nd floor          │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰1.2M/month    [❤️]│ │
│ │ Jung-gu • 3min to City Hall       │ │
│ │ 2Room • 35m² • 5th floor          │ │
│ └───────────────────────────────────┘ │
│ |||                               ||| │
├─────────────────────────────────────┤
│            Bottom Tab Bar           │ <- 80px
│  🏠 Home │ ❤️ Saved │ ➕ Post │ 💬 Chat │ 👤 Profile │
└─────────────────────────────────────┘
```

### 2.2 검색 결과 화면 (Search Results)

```
┌─────────────────────────────────────┐
│ [←] "Hongdae station"     [🗺️][⚙️] │ <- Header with Map Toggle
├─────────────────────────────────────┤
│ [Sort: Recent ▼] [Filters (2)] (15) │ <- Filter Bar
├─────────────────────────────────────┤
│                                     │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰500k/month    [❤️]│ │ <- Search Results
│ │ Mapo-gu • 2min to Hongik Univ.   │ │    (Filtered Properties)
│ │ Studio • 20m² • 3rd floor         │ │
│ │ Posted 2 hours ago                │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰600k/month    [❤️]│ │
│ │ Mapo-gu • 3min to Hongik Univ.   │ │
│ │ 1Room • 22m² • 1st floor          │ │
│ │ Posted 4 hours ago                │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰750k/month    [❤️]│ │
│ │ Mapo-gu • 5min to Hongik Univ.   │ │
│ │ Studio • 25m² • 4th floor         │ │
│ │ Posted 6 hours ago                │ │
│ └───────────────────────────────────┘ │
│ |||                               ||| │
│                                     │
│ [Load More Properties]              │ <- Load More
├─────────────────────────────────────┤
│            Bottom Tab Bar           │ <- 80px
│  🏠 Home │ ❤️ Saved │ ➕ Post │ 💬 Chat │ 👤 Profile │
└─────────────────────────────────────┘
```

### 2.3 고급 필터 모달 (Advanced Filter Modal)

```
┌─────────────────────────────────────┐
│ (Filters)               [Reset][✕] │ <- Modal Header
├─────────────────────────────────────┤
│                                     │
│ (💰 Price Range)                   │
│ Deposit: ₩0M ●━━━━━━━━━━● ₩100M      │ <- Range Slider
│ Monthly: ₩0k ●━━━━●━━━━━● ₩2M        │
│                                     │
│ (🏠 Property Type)                 │
│ [✓Studio] [OneRoom] [TwoRoom] [3+]  │ <- Toggle Buttons
│                                     │
│ (📍 Location)                      │
│ Walking distance to station:        │
│ ○ Any  ●5min  ○10min  ○15min       │ <- Radio Buttons
│                                     │
│ (⭐ Features)                      │
│ [✓Parking] [Elevator] [✓Pet OK]    │ <- Checkboxes
│ [Furnished] [AC] [Balcony]          │
│                                     │
│ (🏢 Building)                      │
│ Floor: [Any ▼]                      │ <- Dropdown
│ Built: [Any ▼]                      │
│                                     │
│ |||                               ||| │
├─────────────────────────────────────┤
│ [Show 12 properties]                │ <- Apply Button
└─────────────────────────────────────┘
```

### 2.4 매물 상세 화면 (Property Detail)

```
┌─────────────────────────────────────┐
│ [←] (Property Detail)    [↗][❤️]   │ <- Header
├─────────────────────────────────────┤
│ [  MAIN PROPERTY IMAGE  ] (1/8)     │ <- Image Gallery
│ ●○○○○○○○                            │    (300px height)
├─────────────────────────────────────┤
│                                     │
│ (Modern Studio in Hongdae)          │ <- Property Title
│ 💰 Deposit: ₩30M  Monthly: ₩800k    │ <- Price Info
│ 📍 Mapo-gu, Seoul • 2min to Hongik  │ <- Location
│ 🏠 Studio • 25m² (7.5평) • 3/5F     │ <- Basic Info
│                                     │
│ ── ── ── ── ── ── ── ── ── ── ── ──  │ <- Divider
│                                     │
│ (📋 Property Features)              │
│ ✅ Parking Available                │ <- Features List
│ ✅ Elevator                         │
│ ✅ Pet Friendly                     │
│ ✅ Furnished                        │
│ ❌ Balcony                          │
│                                     │
│ ── ── ── ── ── ── ── ── ── ── ── ──  │
│                                     │
│ (🗺️ Location & Transport)          │
│ [    MINI MAP VIEW    ]             │ <- Mini Map
│ 🚇 Hongik Univ. Station - 2min walk│
│ 🚇 Mapo Station - 8min walk         │
│ 🏪 Convenience stores nearby        │
│                                     │
│ ── ── ── ── ── ── ── ── ── ── ── ──  │
│                                     │
│ (👤 Owner Information)              │
│ (Profile Pic) John Kim              │ <- Owner Info
│ Response rate: 95% • English OK     │
│ Member since 2023                   │
│ |||                               ||| │
├─────────────────────────────────────┤
│ [Add to Favorites] [💬 Message]     │ <- Action Buttons (80px)
└─────────────────────────────────────┘
```

### 2.5 찜 목록 화면 (Saved Properties)

```
┌─────────────────────────────────────┐
│ (My Favorites)           [Sort ▼]   │ <- Header
├─────────────────────────────────────┤
│ [All (12)] [Available (8)] [Price↓(2)] [New (3)] │ <- Filter Chips
├─────────────────────────────────────┤
│                                     │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰500k/month    [💔]│ │ <- Saved Property Cards
│ │ Hongdae • 2min to station    [🔔] │ │    (Price Alert Badge)
│ │ Studio • 20m² • Available         │ │
│ │ Saved 2 days ago                  │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰600k→550k     [💔]│ │ <- Price Drop Badge
│ │ Gangnam • 5min to station    [⬇️] │ │
│ │ 1Room • 25m² • Available          │ │
│ │ Price dropped yesterday           │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ [IMG────────] 💰800k/month    [💔]│ │
│ │ Itaewon • 3min to station    [❌] │ │ <- Rented Status
│ │ Studio • 22m² • Rented            │ │
│ │ Saved 1 week ago                  │ │
│ └───────────────────────────────────┘ │
│ |||                               ||| │
│                                     │
│ (No more saved properties)          │
├─────────────────────────────────────┤
│            Bottom Tab Bar           │ <- 80px
│  🏠 Home │ ❤️ Saved │ ➕ Post │ 💬 Chat │ 👤 Profile │
└─────────────────────────────────────┘
```

### 2.6 채팅 목록 화면 (Chat List)

```
┌─────────────────────────────────────┐
│ (Messages)                    [🔍]  │ <- Header
├─────────────────────────────────────┤
│                                     │
│ ┌─┬─────────────────────────────┬───┐ │
│ │📷│ Hongdae Studio Apartment    │ ● │ │ <- Active Chat Item
│ │ │ John Kim                     │ 2 │ │    (Unread Count)
│ │ │ "Is it still available?"     │   │ │
│ │ │ 2 hours ago                  │   │ │
│ └─┴─────────────────────────────┴───┘ │
│ ┌─┬─────────────────────────────┬───┐ │
│ │📷│ Gangnam 1Room                │   │ │
│ │ │ Sarah Lee                    │   │ │
│ │ │ "Thank you for the info"     │   │ │
│ │ │ Yesterday                    │   │ │
│ └─┴─────────────────────────────┴───┘ │
│ ┌─┬─────────────────────────────┬───┐ │
│ │📷│ Itaewon Studio               │   │ │
│ │ │ Mike Johnson                 │   │ │
│ │ │ "When can I visit?"          │   │ │
│ │ │ 2 days ago                   │   │ │
│ └─┴─────────────────────────────┴───┘ │
│                                     │
│ |||                               ||| │
│                                     │
│ ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │ <- Empty State
│   (No conversations yet)             │    (If no chats)
│   Start browsing to find properties  │
│   [Browse Properties]                │
│ └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
├─────────────────────────────────────┤
│            Bottom Tab Bar           │ <- 80px
│  🏠 Home │ ❤️ Saved │ ➕ Post │ 💬 Chat │ 👤 Profile │
└─────────────────────────────────────┘
```

### 2.7 채팅방 화면 (Chat Room)

```
┌─────────────────────────────────────┐
│ [←] [📷] Hongdae Studio      [⋮]    │ <- Chat Header
│     ₩800k/month • Available         │    (Property Info)
├─────────────────────────────────────┤
│                                     │
│                  (Today)            │ <- Date Separator
│                                     │
│ ┌─────────────────────────────────┐   │
│ │ Hi! Is this property still      │   │ <- Received Message
│ │ available for rent?             │   │
│ │                        10:30 AM │   │
│ └─────────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────────┐ │
│   │ Yes, it's still available!      │ │ <- Sent Message
│   │ Would you like to schedule a    │ │
│   │ visit?                          │ │
│   │ 10:32 AM ✓✓                    │ │
│   └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐   │
│ │ Great! When would be a good     │   │
│ │ time? I'm free this weekend.    │   │
│ │                        10:35 AM │   │
│ └─────────────────────────────────┘   │
│                                     │
│ |||                               ||| │
│                                     │
│ ┌─ Quick Replies (Optional) ─ ─ ─ ─ ┐ │ <- Quick Actions
│ │ [I'm interested] [Schedule visit] │ │
│ │ [Ask about price] [More info]    │ │
│ └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
├─────────────────────────────────────┤
│ {Type a message...}    [📷] [📤]   │ <- Input Area (60px)
└─────────────────────────────────────┘
```

### 2.8 프로필 화면 (Profile)

```
┌─────────────────────────────────────┐
│ (Profile)                     [⚙️]  │ <- Header
├─────────────────────────────────────┤
│                                     │
│    ┌─────┐                          │
│    │ 👤  │ John Smith               │ <- User Info
│    │     │ john.smith@email.com     │
│    └─────┘ Member since Oct 2024    │
│           [Edit Profile]            │
│                                     │
│ ── ── ── ── ── ── ── ── ── ── ── ──  │
│                                     │
│ (📊 My Activity)                    │
│ ┌─────────────────┬─────────────────┐ │
│ │ [❤️] My Favorites │ [🔍] Searches   │ │ <- Activity Grid
│ │    12 saved      │    5 saved      │ │
│ ├─────────────────┼─────────────────┤ │
│ │ [👁️] Recently   │ [🏠] My Posts   │ │
│ │    8 viewed      │    0 active     │ │
│ └─────────────────┴─────────────────┘ │
│                                     │
│ ── ── ── ── ── ── ── ── ── ── ── ──  │
│                                     │
│ (⚙️ Settings)                       │
│ [🔔] Notifications              [>] │ <- Settings Menu
│ [🌐] Language & Region          [>] │
│ [🔒] Privacy & Security         [>] │
│ [📱] App Preferences            [>] │
│                                     │
│ ── ── ── ── ── ── ── ── ── ── ── ──  │
│                                     │
│ (❓ Help & Support)                 │
│ [📚] FAQ & Help                 [>] │
│ [📞] Contact Support            [>] │
│ [⭐] Rate App                   [>] │
│                                     │
│ |||                               ||| │
│                                     │
│ [Sign Out]                          │ <- Sign Out Button
├─────────────────────────────────────┤
│            Bottom Tab Bar           │ <- 80px
│  🏠 Home │ ❤️ Saved │ ➕ Post │ 💬 Chat │ 👤 Profile │
└─────────────────────────────────────┘
```

---

## 3. 모달 및 팝업 화면

### 3.1 로그인 모달 (Login Modal)

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│          ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ┐        │
│          │                 │        │
│          │  [🏠] House     │        │ <- Modal Content
│          │                 │        │
│          │  Welcome back!  │        │
│          │                 │        │
│          │  Sign in to save│        │
│          │  your favorite  │        │
│          │  properties     │        │
│          │                 │        │
│          │  [🔵 Continue   │        │
│          │   with Google]  │        │
│          │                 │        │
│          │  [Skip for now] │        │
│          │                 │        │
│          └─ ─ ─ ─ ─ ─ ─ ─ ─ ┘        │
│                                     │
│                                     │
│ (Background dimmed)                 │
└─────────────────────────────────────┘
```

### 3.2 이미지 갤러리 모달 (Image Gallery Modal)

```
┌─────────────────────────────────────┐
│ [←] (3 of 8)                  [✕]   │ <- Gallery Header
├─────────────────────────────────────┤
│                                     │
│                                     │
│        [FULL SCREEN IMAGE]          │ <- Main Image
│                                     │
│                                     │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ ●○○○○○○○                            │ <- Thumbnail Strip
│ [📷] [📷] [📷] [📷] [📷] [📷] [📷] [📷] │
└─────────────────────────────────────┘
```

### 3.3 연락처 액션 시트 (Contact Action Sheet)

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│          ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐    │
│          │                       │    │
│          │ Contact Property Owner│    │ <- Action Sheet
│          │                       │    │
│          │ [📞] Call             │    │
│          │ [💬] Send Message     │    │
│          │ [📧] Email            │    │
│          │ [📋] Copy Contact     │    │
│          │                       │    │
│          │ [Cancel]              │    │
│          │                       │    │
│          └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘    │
│                                     │
│ (Background dimmed)                 │
└─────────────────────────────────────┘
```

---

## 4. 사용자 플로우 다이어그램

### 4.1 매물 검색 플로우

```
Start
  ↓
[Home Screen]
  ↓
Search Input / Quick Filter
  ↓
[Search Results]
  ↓
Property Selection
  ↓
[Property Detail]
  ↓
User Action Decision
  ├─ Save to Favorites → [Saved List]
  ├─ Message Owner → [Login Check] → [Chat Room]
  └─ Continue Browsing → [Back to Results]
```

### 4.2 찜하기 플로우

```
Property Card/Detail
  ↓
Heart Icon Tap
  ↓
Login Status Check
  ├─ Logged In → Save Success → UI Update
  └─ Not Logged In → [Login Modal] → [Google OAuth] → Save → UI Update
```

### 4.3 문의/채팅 플로우

```
Property Detail
  ↓
Message Button Tap
  ↓
Login Status Check
  ├─ Logged In → Check Existing Chat
  │                ├─ Existing → [Open Chat Room]
  │                └─ New → [Create Chat] → [Chat Room]
  └─ Not Logged In → [Login Modal] → [Continue Flow]
```

---

## 5. 상태별 화면 변화

### 5.1 로딩 상태 (Loading States)

#### 5.1.1 Property Card Loading (Skeleton)
```
┌───────────────────────────────────┐
│ [████████████████████████]       │ <- Image Placeholder
│ ████████████████                  │ <- Title Placeholder
│ ████████████                      │ <- Location Placeholder  
│ ████████                          │ <- Details Placeholder
└───────────────────────────────────┘
```

#### 5.1.2 Search Loading
```
┌─────────────────────────────────────┐
│ 🔍 {Searching...}                   │
├─────────────────────────────────────┤
│                                     │
│          [🔄] Searching...          │
│        Finding properties for you   │
│                                     │
└─────────────────────────────────────┘
```

### 5.2 빈 상태 (Empty States)

#### 5.2.1 No Search Results
```
┌─────────────────────────────────────┐
│ [←] "Studio Gangnam"           [⚙️] │
├─────────────────────────────────────┤
│                                     │
│            [🔍]                     │
│                                     │
│       No properties found           │
│                                     │
│   Try adjusting your filters or     │
│   search in a different area        │
│                                     │
│   [Adjust Filters] [New Search]     │
│                                     │
└─────────────────────────────────────┘
```

#### 5.2.2 Empty Favorites
```
┌─────────────────────────────────────┐
│ (My Favorites)                      │
├─────────────────────────────────────┤
│                                     │
│            [❤️]                     │
│                                     │
│      No saved properties yet        │
│                                     │
│    Start exploring to save your     │
│         favorite properties         │
│                                     │
│      [Browse Properties]            │
│                                     │
└─────────────────────────────────────┘
```

### 5.3 에러 상태 (Error States)

#### 5.3.1 Network Error
```
┌─────────────────────────────────────┐
│            [⚠️]                     │
│                                     │
│       Connection Error              │
│                                     │
│   Please check your internet        │
│   connection and try again          │
│                                     │
│        [Try Again]                  │
│                                     │
└─────────────────────────────────────┘
```

#### 5.3.2 Login Error
```
┌─────────────────────────────────────┐
│                                     │
│          ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ┐        │
│          │     [❌]        │        │
│          │                 │        │
│          │ Login Failed    │        │
│          │                 │        │
│          │ Please try      │        │
│          │ again later     │        │
│          │                 │        │
│          │ [Try Again]     │        │
│          │                 │        │
│          └─ ─ ─ ─ ─ ─ ─ ─ ─ ┘        │
│                                     │
└─────────────────────────────────────┘
```

---

## 6. 인터랙션 및 애니메이션 가이드

### 6.1 버튼 인터랙션

#### 6.1.1 Heart Button (찜하기)
```
Default State: [🤍] (Outline)
  ↓ Tap
Pressed State: [❤️] (Filled + Scale Animation)
  ↓ Success
Success State: [❤️] (Filled + Bounce)
```

#### 6.1.2 Filter Chips
```
Inactive: [Tag Name] (Gray border)
  ↓ Tap
Active: [Tag Name] (Blue background)
  ↓ Tap
With Count: [Tag Name (3)] (Blue + Count)
```

### 6.2 화면 전환 애니메이션

#### 6.2.1 Tab Navigation
```
Tab Switch: No animation (Instant)
Badge Update: Scale in/out animation
```

#### 6.2.2 Stack Navigation
```
Push: Slide from right (iOS style)
Pop: Slide to right
Modal Present: Slide up from bottom
Modal Dismiss: Slide down to bottom
```

### 6.3 리스트 인터랙션

#### 6.3.1 Pull to Refresh
```
Pull Down: Show refresh indicator
Release: Trigger refresh animation
Complete: Hide indicator + show new content
```

#### 6.3.2 Infinite Scroll
```
Scroll to bottom: Show loading indicator
Load more: Add new items with fade-in
Error: Show retry button
```

---

## 7. 반응형 고려사항

### 7.1 다양한 화면 크기

#### 7.1.1 Small Screens (iPhone SE)
```
- Search bar height: 44px (reduced)
- Property card: Compact layout
- Bottom tab: 50px height (reduced)
- Text size: Minimum 14px
```

#### 7.1.2 Large Screens (iPhone Plus/Pro Max)
```
- Property card: 2 columns in landscape
- Increased padding: 20px sides
- Larger touch targets: 48px minimum
- More content visible per screen
```

### 7.2 Landscape Mode

#### 7.2.1 Home Screen Landscape
```
┌─────────────────────────────────────────────────────────────┐
│ [☰] House                          [🔔] [👤]               │
├─────────────────────────────────────────────────────────────┤
│ 🔍 {Search...} [🚇][💰][🏠][⚙️]                           │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │ │ [IMG]   │ │
│ │ 💰500k  │ │ 💰700k  │ │ 💰400k  │ │ 💰900k  │ │ 💰600k  │ │
│ │ Hongdae │ │ Gangnam │ │ Itaewon │ │ Yongsan │ │ Mapo    │ │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
├─────────────────────────────────────────────────────────────┤
│ [🏠] [❤️] [➕] [💬] [👤]                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. 구현 우선순위 가이드

### 8.1 Phase 1 - 핵심 기능 (2주)

```
Week 1:
├── Home Screen (기본 레이아웃)
├── Property Card Component  
├── Search Results Screen
└── Basic Navigation

Week 2:
├── Property Detail Screen
├── Basic Login Modal
├── Tab Navigation
└── Loading States
```

### 8.2 Phase 2 - 확장 기능 (2주)

```
Week 3:
├── Advanced Filter Modal
├── Favorites Screen
├── Chat List Screen  
└── Error Handling

Week 4:
├── Chat Room Screen
├── Profile Screen
├── Animations & Interactions
└── Responsive Layout
```

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "IA를 기반으로 P1 범위 로우 피델리티 와이어프레임 프로토타입 설계", "status": "completed", "activeForm": "IA를 기반으로 P1 범위 로우 피델리티 와이어프레임 프로토타입 설계하는 중"}, {"content": "핵심 화면별 와이어프레임 작성 (Home, Search, Detail, Chat, Profile)", "status": "in_progress", "activeForm": "핵심 화면별 와이어프레임 작성하는 중"}, {"content": "사용자 플로우와 화면 연결 구조 설계", "status": "pending", "activeForm": "사용자 플로우와 화면 연결 구조 설계하는 중"}]