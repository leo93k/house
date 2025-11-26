# 서비스 플로우 (Service Flow)

> **버전**: 2.0 (현재 구현 기반)
> **관련 문서**: [IA.md](./IA.md), [PRD.md](./PRD.md)

---

## 1. 전체 서비스 플로우 개요

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP START                               │
└─────────────────────────┬───────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                      HOME SCREEN (/)                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│  │   Profile   │    │    Heart    │    │    Bell     │        │
│  │   Avatar    │    │   (Saved)   │    │  (Alerts)   │        │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘        │
│         ↓                  ↓                  ↓                │
│    /profile           /saved          /notifications           │
├─────────────────────────────────────────────────────────────────┤
│              "What are you looking for?"                        │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │      🏠 HOUSE       │    │       🚗 CAR        │            │
│  │   Find your home    │    │   Find your car     │            │
│  └──────────┬──────────┘    └──────────┬──────────┘            │
│             ↓                          ↓                        │
│         /house                       /car                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 부동산 (House) 서비스 플로우

### 2.1 메인 플로우
```
┌─────────────────────────────────────────────────────────────────┐
│                    HOUSE MAP VIEW (/house)                      │
├─────────────────────────────────────────────────────────────────┤
│  [← Back]  [House]  [❤️]                                        │
├─────────────────────────────────────────────────────────────────┤
│  📍 Pyeongchang-gun ▼                                           │
├─────────────────────────────────────────────────────────────────┤
│  🔍 [Search location...]  ──────→  /house/search                │
├─────────────────────────────────────────────────────────────────┤
│  [Price ▼] [Real Trans] [Area ㎡ ▼] [↺ Reset]                   │
│      ↓          ↓            ↓                                  │
│  Filter Modal (Bottom Sheet 80%)                                │
├─────────────────────────────────────────────────────────────────┤
│  [🗺️ Map View]  [📋 List View]  ────→  /house/list              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌──────┐    Interactive Map Area                      │
│           │ ₩800k │   Property Markers                         │
│           └──┬───┘                                              │
│              ↓                                                  │
│      Property Preview Card                                      │
│           ↓                                                     │
│      /house/[id]                                                │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 검색 플로우
```
/house/search
┌─────────────────────────────────────────────────────────────────┐
│  [← Back]  [🔍 Search location or apartment... ]  [✕ Clear]    │
├─────────────────────────────────────────────────────────────────┤
│  Recent Searches                              [Clear All]       │
│  ┌─────────────────────────────────────────┬──┐                │
│  │ 🕐 Gangnam Station                       │✕ │                │
│  ├─────────────────────────────────────────┼──┤                │
│  │ 🕐 Hongdae area                          │✕ │                │
│  └─────────────────────────────────────────┴──┘                │
├─────────────────────────────────────────────────────────────────┤
│  Popular Searches                                               │
│  ┌─────────────────────────────────────────────┐               │
│  │ 📈 Seoul Studio                              │               │
│  ├─────────────────────────────────────────────┤               │
│  │ 📈 Near Subway Station                       │               │
│  └─────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
                          ↓
                    Select Search
                          ↓
                    Return to Map with Results
```

### 2.3 상세 정보 플로우
```
/house/[id]
┌─────────────────────────────────────────────────────────────────┐
│  [← Back]  [Property Detail]  [🔗 Share]  [❤️ Save]            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐       │
│  │              Image Gallery (Swipeable)              │       │
│  │                    1/8  ● ○ ○ ○ ○ ○ ○ ○            │       │
│  └─────────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  Modern Studio in Hongdae                                       │
│  ┌─────────────┐  Deposit: ₩10,000,000                         │
│  │   ₩800k     │  Monthly: ₩800,000                            │
│  │   /month    │  Maintenance: ₩100,000                        │
│  └─────────────┘                                                │
│  📍 Mapo-gu, Seoul • 3min to Hongik Univ. Station              │
├─────────────────────────────────────────────────────────────────┤
│  Property Details (Gray Box)                                    │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ Type: Studio          │ Size: 25m²                  │       │
│  │ Floor: 3rd/5          │ Built: 2020                 │       │
│  └─────────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  Features & Options (Grid)                                      │
│  [🅿️ Parking] [🛗 Elevator] [🐕 Pet OK] [❄️ AC] [🧺 Washer]    │
├─────────────────────────────────────────────────────────────────┤
│  Owner Information                                              │
│  [👤 Avatar]  Kim Agent  ⭐ 4.8  Response: 95%                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────┐            │
│  │  📞 Call     │  │      💬 Chat Inquiry         │            │
│  └──────────────┘  └──────────────┬───────────────┘            │
└─────────────────────────────────────┼───────────────────────────┘
                                      ↓
                                  /chat/[id]
```

---

## 3. 중고차 (Car) 서비스 플로우

### 3.1 메인 플로우
```
┌─────────────────────────────────────────────────────────────────┐
│                    CAR LIST VIEW (/car)                         │
├─────────────────────────────────────────────────────────────────┤
│  [← Back]  [Car]  [❤️]                                          │
├─────────────────────────────────────────────────────────────────┤
│  📍 Seoul, Korea ▼                                              │
├─────────────────────────────────────────────────────────────────┤
│  🔍 [Search car...]  ────────→  /car/search                     │
├─────────────────────────────────────────────────────────────────┤
│  [Brand ▼] [Price ▼] [Year ▼] [Fuel ▼] [More...]               │
│      ↓         ↓         ↓        ↓                            │
│  Filter Modal (Bottom Sheet 80%)                                │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ Brand: [Hyundai] [Kia] [BMW] [Tesla] [Genesis]      │       │
│  │ Price: ○─────────────────●─────○ ₩15M - ₩35M       │       │
│  │ Year:  ○─────────●───────────────○ 2018 - 2024     │       │
│  │ Mileage: ○───────────●───────────○ 0km - 80,000km  │       │
│  │ Fuel: [Gasoline] [Diesel] [Hybrid] [Electric]      │       │
│  │ Transmission: [Automatic] [Manual]                  │       │
│  │                                                      │       │
│  │ [↺ Reset]                          [Apply Filters] │       │
│  └─────────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  Found 23 cars                                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────┬────────────────────────────────┐                   │
│  │  📷    │ Hyundai Sonata 2022            │                   │
│  │  Car   │ ₩28,500,000                    │                   │
│  │  Image │ 2022 • 35,000km • Gasoline     │                   │
│  │  [❤️]  │ 👁️ 1,250  ❤️ 89                │                   │
│  └────┬───┴────────────────────────────────┘                   │
│       ↓                                                         │
│   /car/[id]                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 검색 플로우
```
/car/search
┌─────────────────────────────────────────────────────────────────┐
│  [← Back]  [🔍 Search car model, brand, or year ]  [✕]         │
├─────────────────────────────────────────────────────────────────┤
│  Recent Searches                              [Clear All]       │
│  ┌─────────────────────────────────────────┬──┐                │
│  │ 🕐 Hyundai Avante                        │✕ │                │
│  ├─────────────────────────────────────────┼──┤                │
│  │ 🕐 Kia Morning                           │✕ │                │
│  ├─────────────────────────────────────────┼──┤                │
│  │ 🕐 BMW 3 Series                          │✕ │                │
│  └─────────────────────────────────────────┴──┘                │
├─────────────────────────────────────────────────────────────────┤
│  Popular Searches                                               │
│  ┌─────────────────────────────────────────────┐               │
│  │ 📈 Hyundai Sonata 2020                       │               │
│  ├─────────────────────────────────────────────┤               │
│  │ 📈 Kia K5 Automatic                          │               │
│  ├─────────────────────────────────────────────┤               │
│  │ 📈 Tesla Model Y                             │               │
│  └─────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 상세 정보 플로우
```
/car/[id]
┌─────────────────────────────────────────────────────────────────┐
│  [← Back]  [Car Detail]  [🔗 Share]  [❤️ Save]                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐       │
│  │              Image Gallery (Swipeable)              │       │
│  │                    1/12  ● ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○   │       │
│  └─────────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  Hyundai Sonata 2022                                            │
│  ┌─────────────┐  Gasoline • Automatic • 35,000km              │
│  │ ₩28,500,000 │                                               │
│  └─────────────┘                                                │
├─────────────────────────────────────────────────────────────────┤
│  Vehicle Details (Gray Box)                                     │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ Year: 2022             │ Mileage: 35,000km          │       │
│  │ Fuel: Gasoline         │ Transmission: Automatic    │       │
│  │ Engine: 2.0L           │ Color: White               │       │
│  └─────────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  Safety Information                                             │
│  [🛡️ No Accidents]  [🔧 Full Insurance History]                │
├─────────────────────────────────────────────────────────────────┤
│  Features & Options (Grid)                                      │
│  [🧭 Navigation] [☀️ Sunroof] [🪑 Leather] [📷 Camera] [🔊 Premium Audio]│
├─────────────────────────────────────────────────────────────────┤
│  Seller Information                                             │
│  [Dealer Badge]  [👤]  Seoul Auto  ⭐ 4.7  Response: 92%       │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────┐            │
│  │  📞 Call     │  │      💬 Chat Inquiry         │            │
│  └──────────────┘  └──────────────┬───────────────┘            │
└─────────────────────────────────────┼───────────────────────────┘
                                      ↓
                                  /chat/[id]
```

---

## 4. 찜 목록 (Saved) 서비스 플로우

```
┌─────────────────────────────────────────────────────────────────┐
│                    SAVED SCREEN (/saved)                        │
├─────────────────────────────────────────────────────────────────┤
│  [← Back]  [My Favorites]                                       │
├─────────────────────────────────────────────────────────────────┤
│  [✓] Show Available Only        [All ▼] ← Category Filter      │
│                                    ├─ All                       │
│                                    ├─ House                     │
│                                    └─ Car                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────┬────────────────────────────────┐                   │
│  │  📷    │ Monthly Rent ₩800k             │                   │
│  │  House │ ₩50k (Maintenance)             │                   │
│  │  Image │ Mapo-gu • 2min to Hongik Univ. │                   │
│  │  [❤️]  │ Studio • 20m² • 3rd floor      │                   │
│  │        │ 👁️ 1,250  ❤️ 89                │                   │
│  └────┬───┴────────────────────────────────┘                   │
│       ↓                                                         │
│   /house/[id] or /car/[id]                                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────┬────────────────────────────────┐                   │
│  │  📷    │ Hyundai Sonata 2022            │                   │
│  │  Car   │ ₩28,500,000                    │                   │
│  │  Image │ 2022 • 35,000km • Gasoline     │                   │
│  │  [❤️]  │ 👁️ 980  ❤️ 124                 │                   │
│  └────────┴────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘

Empty State:
┌─────────────────────────────────────────────────────────────────┐
│                          [🤍 Big Heart]                         │
│                    No saved properties yet                      │
│             Start exploring to save your favorites              │
│                    [Browse Properties]                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. 전체 사용자 여정 (User Journey)

### 5.1 부동산 검색 여정
```
App Open
    ↓
Home Screen
    ↓
Tap "House" Card
    ↓
House Map View (/house)
    ↓
┌─────────────────────────────┐
│   User Actions:             │
│   • Apply Filters           │
│   • Search Location         │
│   • Switch to List View     │
│   • Tap Property Marker     │
└─────────────────────────────┘
    ↓
View Property Card
    ↓
Tap Card
    ↓
Property Detail (/house/[id])
    ↓
┌─────────────────────────────┐
│   User Actions:             │
│   • Save to Favorites       │
│   • Share Property          │
│   • Call Owner              │
│   • Start Chat              │
└─────────────────────────────┘
    ↓
Chat Inquiry (/chat/[id])
    ↓
Schedule Viewing / Negotiate
    ↓
Complete Transaction
```

### 5.2 중고차 검색 여정
```
App Open
    ↓
Home Screen
    ↓
Tap "Car" Card
    ↓
Car List View (/car)
    ↓
┌─────────────────────────────┐
│   User Actions:             │
│   • Apply Filters           │
│   • Search by Model/Brand   │
│   • Browse List             │
└─────────────────────────────┘
    ↓
Tap Car Card
    ↓
Car Detail (/car/[id])
    ↓
┌─────────────────────────────┐
│   User Actions:             │
│   • Check Safety Info       │
│   • View All Features       │
│   • Save to Favorites       │
│   • Contact Seller          │
└─────────────────────────────┘
    ↓
Chat Inquiry (/chat/[id])
    ↓
Schedule Test Drive / Negotiate
    ↓
Complete Purchase
```

### 5.3 찜 관리 여정
```
Any Screen with Heart Icon
    ↓
Tap Heart Icon
    ↓
Saved Screen (/saved)
    ↓
┌─────────────────────────────┐
│   User Actions:             │
│   • Filter by Category      │
│   • Show Available Only     │
│   • Remove from Favorites   │
│   • View Item Details       │
└─────────────────────────────┘
    ↓
Tap Item
    ↓
Detail Screen (House or Car)
    ↓
Continue Interaction
```

---

## 6. 화면 전환 맵 (Screen Transition Map)

```
                                    ┌─────────────┐
                                    │   /saved    │
                                    └──────┬──────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ↓                      ↓                      ↓
             ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
             │  /profile   │        │     / (Home)│        │/notifications│
             └─────────────┘        └──────┬──────┘        └─────────────┘
                                           │
                              ┌────────────┴────────────┐
                              ↓                         ↓
                       ┌─────────────┐           ┌─────────────┐
                       │   /house    │           │    /car     │
                       └──────┬──────┘           └──────┬──────┘
                              │                         │
                    ┌─────────┼─────────┐     ┌────────┼────────┐
                    ↓         ↓         ↓     ↓        ↓        ↓
              ┌──────────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐
              │/house/list│ │search│ │[id]  │ │search│ │  [id]    │
              └──────────┘ └──────┘ └───┬──┘ └──────┘ └────┬─────┘
                                        │                   │
                                        └─────────┬─────────┘
                                                  ↓
                                           ┌─────────────┐
                                           │  /chat/[id] │
                                           └─────────────┘
```

---

## 7. 인터랙션 패턴

### 7.1 필터링 패턴
```
Tap Filter Chip
    ↓
Open Filter Modal (80% height, from bottom)
    ↓
┌─────────────────────────────┐
│ Adjust Filter Options:      │
│ • Slide price range         │
│ • Select categories         │
│ • Toggle options            │
└─────────────────────────────┘
    ↓
[Reset] ← Clear all filters
    ↓
[Apply] ← Apply and close modal
    ↓
Results Updated
```

### 7.2 검색 패턴
```
Tap Search Bar
    ↓
Navigate to Search Screen
    ↓
TextInput Auto-focused
    ↓
┌─────────────────────────────┐
│ User can:                   │
│ • Type search query         │
│ • Tap recent search         │
│ • Tap popular search        │
│ • Clear search text         │
│ • Remove recent items       │
│ • Clear all recent          │
└─────────────────────────────┘
    ↓
Submit Search (Enter key)
    ↓
Navigate back with results
```

### 7.3 상세 보기 패턴
```
Tap Item Card
    ↓
Push Detail Screen
    ↓
┌─────────────────────────────┐
│ Interactions:               │
│ • Swipe images horizontally │
│ • Scroll content vertically │
│ • Tap heart to save         │
│ • Tap share to share        │
│ • Tap call button           │
│ • Tap chat button           │
└─────────────────────────────┘
    ↓
Back button returns to list
```

---

## 8. 데이터 플로우

### 8.1 현재 구현 (Mock Data)
```
Component State (useState)
         ↓
Mock Data Arrays
         ↓
Filter/Search Logic (Local)
         ↓
Render UI Components
```

### 8.2 향후 구현 (Backend Integration)
```
User Action
    ↓
API Request (axios/fetch)
    ↓
Backend Server
    ↓
Database Query
    ↓
Response Data
    ↓
State Update (useState/Context/Redux)
    ↓
UI Re-render
```

---

## 9. 핵심 UI 컴포넌트 플로우

### 9.1 Property/Car Card
```
Card Container
├── Image Section (120px)
│   ├── Image/Placeholder
│   └── Heart Button (absolute positioned)
└── Content Section (flex: 1)
    ├── Title/Name
    ├── Price (bold)
    ├── Secondary Info
    ├── Details (truncated)
    └── Stats Row
        ├── 👁️ View Count
        └── ❤️ Like Count
```

### 9.2 Bottom Sheet Filter
```
Overlay (rgba(0,0,0,0.5))
├── Touchable Area (closes modal)
└── Modal Container (80% height)
    ├── Header
    │   └── "Filters"
    ├── ScrollView Content
    │   ├── Category Buttons
    │   ├── Range Sliders
    │   └── Toggle Options
    └── Action Buttons
        ├── [Reset] (left)
        └── [Apply] (right, blue)
```

---

**문서 정보:**
- **버전**: 2.0 (현재 구현 기반)
- **최종 업데이트**: Stack Navigation 구조 기반
- **작성일**: 2024년
- **업데이트 주기**: 기능 추가시 지속 업데이트

**관련 문서:**
- [IA.md](./IA.md) - 정보 구조 문서
- [PRD.md](./PRD.md) - 제품 요구사항 문서
