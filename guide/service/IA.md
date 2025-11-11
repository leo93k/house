# Information Architecture (IA) 문서
# 외국인 전용 부동산 매물 플랫폼

> **작성일**: 2024년  
> **버전**: 1.0  
> **프로젝트명**: House (가칭)  
> **관련 문서**: [PRD.md](./PRD.md)

---

## 1. 문서 개요

### 1.1 목적
이 문서는 외국인 전용 부동산 매물 플랫폼의 정보 구조(Information Architecture)를 정의하며, 사용자가 서비스를 직관적이고 효율적으로 이용할 수 있도록 화면 구성, 내비게이션 플로우, 정보 계층을 체계화합니다.

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
│  Logo/Title + Location + Actions     │
├─────────────────────────────────────┤
│                                     │
│            Content Area             │ <- Flexible
│         (각 탭별 고유 콘텐츠)          │
│                                     │
├─────────────────────────────────────┤
│            Bottom Tab Bar           │ <- 80px
│  🏠 Home │ ❤️ Saved │ ➕ Post │ 💬 Chat │ 👤 Profile │
└─────────────────────────────────────┘
```

### 2.2 Bottom Tab Navigation

| 탭 | 아이콘 | 라벨 | 주요 기능 | 우선순위 |
|---|------|-----|---------|---------|
| Home | 🏠 | Home | 매물 검색/둘러보기 | P0 |
| Saved | ❤️ | Saved | 찜한 매물 관리 | P1 |
| Post | ➕ | Post | 매물 등록 | P1 |
| Chat | 💬 | Chat | 문의 채팅 | P0 |
| Profile | 👤 | Profile | 사용자 설정 | P1 |

---

## 3. 화면별 상세 IA

### 3.1 홈 탭 (🏠 Home)

#### 3.1.1 화면 구조
```
Home Screen
├── Header (60px)
│   ├── App Logo (좌측)
│   ├── Location Chip (중앙) - "Seoul, Korea"
│   └── Notification Bell (우측)
├── Search Section (100px)
│   ├── Search Bar - "Search location or station..."
│   └── Voice Search Icon
├── Quick Filters (60px) - 수평 스크롤
│   ├── "Near Stations" 🚇
│   ├── "Under ₩500k" 💰
│   ├── "Studio" 🏠
│   ├── "Pet OK" 🐕
│   └── "More Filters" ⚙️
├── Content Sections (스크롤)
│   ├── "Recommended for you" (맞춤 추천)
│   ├── "Popular near you" (지역 인기)
│   ├── "Recently viewed" (최근 본)
│   └── "Price dropped" (가격 하락)
└── Property Cards
    ├── Image (200px height)
    ├── Price Badge (overlay)
    ├── Property Info (80px)
    └── Quick Actions (❤️, 💬)
```

#### 3.1.2 Property Card 구조
```
Property Card (320x280px)
├── Image Container (320x200px)
│   ├── Main Image
│   ├── Price Badge (좌상단)
│   ├── Image Count (우상단) - "1/8"
│   └── Heart Icon (우하단)
├── Content Container (320x80px)
│   ├── Title (1줄, 16px, bold)
│   ├── Location (1줄, 14px, gray) - "Hongdae • 3 min walk to station"
│   ├── Details (1줄, 14px) - "Studio • 20m² • 3rd floor"
│   └── Posted Time (12px, gray) - "2 hours ago"
└── Action Area
    ├── Heart Button (찜하기)
    └── Message Button (문의하기)
```

### 3.2 검색 결과 화면

#### 3.2.1 Search Results Structure
```
Search Results Screen
├── Header (60px)
│   ├── Back Arrow
│   ├── Search Query Display
│   └── Map Toggle Switch
├── Filter Bar (50px)
│   ├── Sort Dropdown - "Sort by: Recent"
│   ├── Filter Button - "Filters (3)"
│   └── Results Count - "23 properties"
├── Map View (Optional, 300px)
│   ├── Property Markers
│   ├── Cluster Groups
│   ├── Zoom Controls
│   └── Center on Location Button
└── Results List
    ├── Property Cards (동일한 구조)
    ├── Load More Button
    └── End of Results Message
```

#### 3.2.2 Filter Modal Structure
```
Filter Modal (Bottom Sheet)
├── Header
│   ├── "Filters"
│   ├── Reset Button
│   └── Close Button
├── Filter Categories (스크롤)
│   ├── Price Range
│   │   ├── Deposit Slider (0 - 100M KRW)
│   │   └── Monthly Rent Slider (0 - 5M KRW)
│   ├── Property Type
│   │   ├── Studio ✓
│   │   ├── One Room
│   │   ├── Two Room
│   │   └── Three+ Room
│   ├── Location
│   │   ├── Distance from Station
│   │   └── Specific Areas
│   ├── Features
│   │   ├── Parking Available
│   │   ├── Elevator
│   │   ├── Pet Friendly
│   │   └── Furnished
│   └── Building Info
│       ├── Floor Preference
│       └── Building Age
└── Apply Button - "Show X properties"
```

### 3.3 매물 상세 화면

#### 3.3.1 Property Detail Structure
```
Property Detail Screen
├── Header (60px)
│   ├── Back Arrow
│   ├── Share Button
│   └── Heart Toggle
├── Image Gallery (300px)
│   ├── Main Image View
│   ├── Thumbnail Strip (하단)
│   └── Full Screen Button
├── Basic Info Section (120px)
│   ├── Property Title
│   ├── Price Information
│   │   ├── Deposit: ₩30,000,000
│   │   ├── Monthly: ₩800,000
│   │   └── Maintenance: ₩100,000
│   ├── Location & Transport
│   │   ├── Full Address
│   │   └── Station Distance
│   └── Basic Details
│       ├── Type: Studio
│       ├── Size: 25m²
│       └── Floor: 3rd of 5
├── Details Sections (스크롤)
│   ├── Property Features
│   │   ├── Available Options (체크리스트)
│   │   └── Building Amenities
│   ├── Location Info
│   │   ├── Interactive Map
│   │   ├── Nearby Stations
│   │   ├── Nearby Facilities
│   │   └── Neighborhood Description
│   ├── Owner Information
│   │   ├── Contact Name
│   │   ├── Response Rate
│   │   ├── Languages Spoken
│   │   └── Other Properties
│   └── Additional Info
│       ├── Available Date
│       ├── Lease Terms
│       └── Special Notes
├── Similar Properties (Optional)
│   └── Property Cards Carousel
└── Fixed Bottom Actions (80px)
    ├── Add to Favorites Button
    ├── Call/Contact Button
    └── Send Message Button (Primary)
```

### 3.4 찜 탭 (❤️ Saved)

#### 3.4.1 Saved Properties Structure
```
Saved Screen
├── Header (60px)
│   ├── "My Favorites"
│   └── Sort Options
├── Filter Chips (50px) - 수평 스크롤
│   ├── All (23)
│   ├── Available (18)
│   ├── Price Changed (3)
│   └── Recently Added (5)
├── Saved Properties List
│   ├── Property Cards (Modified)
│   │   ├── Price Change Badge (if applicable)
│   │   ├── Status Badge (Available/Rented)
│   │   └── Saved Date
│   └── Remove from Favorites (Swipe Action)
└── Empty State (if no saved items)
    ├── Empty Icon
    ├── "No saved properties yet"
    ├── "Start exploring to save properties"
    └── "Browse Properties" CTA Button
```

### 3.5 매물 등록 탭 (➕ Post)

#### 3.5.1 Post Property Flow
```
Post Property Screen (Multi-Step Form)

Step 1: Property Type (Full Screen)
├── Header - "What type of property?"
├── Type Selection (Cards)
│   ├── Studio
│   ├── One Room
│   ├── Two Room
│   ├── Three Room
│   ├── Officetel
│   └── Apartment
└── Continue Button

Step 2: Basic Information
├── Header - "Basic Information"
├── Form Fields
│   ├── Property Title
│   ├── Description (Textarea)
│   ├── Location Selector
│   └── Address Input
└── Continue Button

Step 3: Property Details
├── Header - "Property Details"
├── Form Sections
│   ├── Size Information
│   │   ├── Area Size (m²/평)
│   │   └── Room Configuration
│   ├── Building Information
│   │   ├── Floor Level
│   │   ├── Total Floors
│   │   └── Building Year
│   └── Available Options (Checkboxes)
└── Continue Button

Step 4: Price Information
├── Header - "Price Information"
├── Price Fields
│   ├── Deposit Amount
│   ├── Monthly Rent
│   ├── Maintenance Fee
│   └── Utilities Included
└── Continue Button

Step 5: Photos
├── Header - "Add Photos"
├── Photo Upload (최대 20장)
│   ├── Main Photo Selector
│   ├── Additional Photos
│   └── Photo Order Adjustment
└── Continue Button

Step 6: Contact & Publish
├── Header - "Contact Information"
├── Contact Form
│   ├── Contact Method
│   ├── Available Times
│   ├── Languages Spoken
│   └── Additional Notes
├── Preview Button
└── Publish Button
```

### 3.6 채팅 탭 (💬 Chat)

#### 3.6.1 Chat List Structure
```
Chat Screen
├── Header (60px)
│   ├── "Messages"
│   └── Search Button
├── Active Conversations
│   ├── Chat Room Item (80px each)
│   │   ├── Property Thumbnail (60x60px)
│   │   ├── Conversation Info
│   │   │   ├── Property Title
│   │   │   ├── Other User Name
│   │   │   ├── Last Message Preview
│   │   │   └── Timestamp
│   │   ├── Unread Badge
│   │   └── Property Status Badge
│   └── Empty State
│       ├── "No conversations yet"
│       ├── "Start browsing properties"
│       └── "Browse Properties" CTA
└── Archived/Old Conversations (Collapsible)
```

#### 3.6.2 Chat Room Structure
```
Chat Room Screen
├── Header (60px)
│   ├── Back Arrow
│   ├── Property Info
│   │   ├── Property Thumbnail
│   │   ├── Property Title
│   │   └── Price
│   └── Actions Menu
│       ├── View Property
│       ├── Call Owner
│       └── Report
├── Messages Area (Flexible Height)
│   ├── Message Bubbles
│   │   ├── Text Messages
│   │   ├── Image Messages
│   │   ├── System Messages
│   │   └── Read Receipts
│   ├── Date Separators
│   └── Typing Indicator
├── Quick Actions (50px) - Optional
│   ├── "I'm interested"
│   ├── "Can we schedule a visit?"
│   ├── "What's included?"
│   └── "Is it still available?"
└── Input Area (60px)
    ├── Text Input
    ├── Image Button
    └── Send Button
```

### 3.7 프로필 탭 (👤 Profile)

#### 3.7.1 Profile Structure
```
Profile Screen
├── Header (60px)
│   ├── "Profile"
│   └── Settings Icon
├── User Information (120px)
│   ├── Profile Photo (80x80px)
│   ├── User Info
│   │   ├── Name
│   │   ├── Join Date
│   │   └── Verification Status
│   └── Edit Profile Button
├── My Activity Section
│   ├── "My Properties" (if property owner)
│   │   ├── Active Listings Count
│   │   └── Manage Properties
│   ├── "My Favorites" 
│   │   ├── Saved Properties Count
│   │   └── View All
│   ├── "Recent Searches"
│   │   ├── Search History
│   │   └── Saved Search Alerts
│   └── "Property Views"
│       ├── Recently Viewed
│       └── View History
├── App Settings
│   ├── Notifications
│   │   ├── Push Notifications
│   │   ├── Email Notifications
│   │   └── Message Notifications
│   ├── Language & Region
│   │   ├── App Language
│   │   ├── Currency Display
│   │   └── Area Unit (m²/평)
│   ├── Privacy & Security
│   │   ├── Profile Visibility
│   │   ├── Data Sharing
│   │   └── Blocked Users
│   └── Account Management
│       ├── Change Password
│       ├── Connected Accounts
│       └── Delete Account
├── Help & Support
│   ├── FAQ
│   ├── Contact Support
│   ├── Report a Problem
│   └── Feature Requests
└── Legal & About
    ├── Terms of Service
    ├── Privacy Policy
    ├── App Version
    └── Sign Out Button
```

---

## 4. 내비게이션 플로우

### 4.1 주요 사용자 여정

#### 4.1.1 신규 사용자 플로우
```
App Launch → Splash Screen (2s) → Onboarding Slides (3개) → 
Home Screen (Guest Mode) → Browse Properties → Property Detail → 
Login Prompt → Google OAuth → Profile Setup → Continue Browsing
```

#### 4.1.2 매물 검색 플로우
```
Home → Search Bar Input → Search Results → Apply Filters → 
Property Detail → Save/Message → [Login if needed] → Chat Room
```

#### 4.1.3 매물 등록 플로우
```
Post Tab → [Login Check] → Property Type → Basic Info → 
Details → Price → Photos → Contact Info → Preview → Publish
```

### 4.2 화면 전환 패턴

#### 4.2.1 Tab Navigation
```
Bottom Tab Bar (Persistent)
├── Tab Switch (Immediate)
├── Badge Updates (Real-time)
└── Selected State (Visual Feedback)
```

#### 4.2.2 Stack Navigation
```
Primary Navigation Stack:
Home → Search Results → Property Detail → Chat Room

Modal Stack:
├── Login Modal
├── Filter Modal  
├── Image Gallery Modal
├── Contact Action Sheet
└── Settings Modals
```

#### 4.2.3 Transition Animations
```
Screen Transitions:
├── Push/Pop (iOS style slide)
├── Modal Present (Bottom up)
├── Tab Switch (No animation)
└── Filter Sheet (Smooth slide up)

Micro-interactions:
├── Button Press (Scale + Haptic)
├── Heart Animation (Scale + Color)
├── Image Loading (Progressive + Skeleton)
└── Pull to Refresh (Standard)
```

---

## 5. 정보 계층 구조

### 5.1 정보 우선순위 매트릭스

#### 5.1.1 홈 화면 정보 우선순위
```
Priority Level 1 (Critical):
└── Search Functionality (검색 기능)

Priority Level 2 (High):
├── Personalized Recommendations (맞춤 추천)
└── Quick Filters (빠른 필터)

Priority Level 3 (Medium):
├── Popular Properties (인기 매물)
└── Recent Properties (최신 매물)

Priority Level 4 (Low):
├── Promotional Content (프로모션)
└── App Tips (사용 팁)
```

#### 5.1.2 매물 카드 정보 우선순위
```
Visual Elements (40%):
└── Main Property Image

Price Information (30%):
├── Monthly Rent (Primary)
└── Deposit (Secondary)

Location Information (20%):
├── Neighborhood Name
└── Transportation Access

Property Details (10%):
├── Property Type
└── Size Information
```

#### 5.1.3 매물 상세 정보 우선순위
```
Above the Fold (First View):
├── Image Gallery
├── Price Information
├── Basic Property Details
└── Location Summary

Below the Fold (Scroll to View):
├── Detailed Features
├── Neighborhood Information  
├── Owner Information
└── Similar Properties
```

### 5.2 콘텐츠 그룹핑

#### 5.2.1 기능적 그룹핑
```
Search & Discovery:
├── Search Bar
├── Filters
├── Map View
└── Recommendations

Property Information:
├── Images
├── Pricing
├── Features
└── Location Details

Communication:
├── Contact Options
├── Messaging
├── Inquiries
└── Notifications

User Management:
├── Authentication
├── Profile
├── Preferences
└── History
```

#### 5.2.2 사용자 역할별 그룹핑
```
Property Seekers (임차인):
├── Search Tools
├── Saved Properties
├── Message Conversations
└── Application History

Property Owners (임대인):
├── Property Management
├── Inquiry Management
├── Performance Analytics
└── Communication Tools

Guest Users (비회원):
├── Browse Properties
├── Basic Search
├── Property Details
└── Registration Prompts
```

---

## 6. 외국인 친화적 IA 설계

### 6.1 언어 및 문화 고려사항

#### 6.1.1 용어 간소화 매핑
```
한국어 용어 → 영어 간소화
├── "전세/월세" → "Deposit + Monthly Rent"
├── "관리비" → "Maintenance Fee"  
├── "원룸/투룸" → "Studio/One Room"
├── "평수" → "Size (m²)"
├── "역세권" → "Near Station"
├── "옵션" → "Features"
├── "방문 예약" → "Schedule Visit"
└── "실거래가" → "Market Price"
```

#### 6.1.2 아이콘 및 시각적 표현
```
Universal Icons:
├── 🏠 Home/Property
├── 💰 Price/Money
├── 🚇 Transportation
├── 📍 Location
├── ❤️ Favorites
├── 💬 Messages
├── 📷 Photos
└── ⚙️ Settings

Cultural Considerations:
├── Currency Format (₩1,000,000 + $750 USD)
├── Area Units (25m² = 7.5평)
├── Distance (Walking time + Metro lines)
└── Date Format (MM/DD/YYYY)
```

### 6.2 진입 장벽 최소화

#### 6.2.1 Guest User Access
```
✅ Accessible without Login:
├── Browse All Properties
├── Search & Filter
├── View Property Details
├── Map Search
└── Save Search Preferences (Local Storage)

🔒 Requires Authentication:
├── Save Favorites
├── Post Properties  
├── Send Messages
├── Receive Notifications
└── Access History Across Devices
```

#### 6.2.2 Progressive Onboarding
```
First Visit:
├── Quick App Introduction (3 slides)
├── Optional Location Permission
└── Start Browsing Immediately

Engagement Triggers:
├── First Property Interest → Login Suggestion
├── Third Property View → Save Feature Introduction
├── Search Repetition → Saved Search Suggestion
└── Contact Attempt → Registration Required
```

---

## 7. 상호작용 및 피드백

### 7.1 사용자 피드백 시스템

#### 7.1.1 Visual Feedback
```
Loading States:
├── Skeleton Screens (Property Cards)
├── Progressive Image Loading
├── Search Result Loading
└── Chat Message Sending

Success States:
├── Property Saved Animation
├── Message Sent Confirmation
├── Filter Applied Feedback
└── Property Posted Success

Error States:
├── Network Error Messages
├── Form Validation Errors
├── Search No Results
└── Login Failed Messages
```

#### 7.1.2 Haptic Feedback (iOS)
```
Interaction Feedback:
├── Light Haptic: Button Taps
├── Medium Haptic: Toggle Actions
├── Heavy Haptic: Important Actions
└── Success Haptic: Completed Actions
```

### 7.2 시스템 상태 표시

#### 7.2.1 Connection Status
```
Online Indicators:
├── Live Property Status
├── Real-time Message Delivery
└── Instant Search Results

Offline Indicators:
├── Cached Content Available
├── Actions Queue for Later
└── Connection Retry Options
```

#### 7.2.2 Property Status
```
Availability Status:
├── ✅ Available
├── ⏳ Under Review
├── 🔄 Reserved
└── ❌ Rented

Verification Status:
├── ✅ Verified Owner
├── ⏳ Pending Verification
└── ⚠️ Unverified
```

---

## 8. 접근성 및 포용성

### 8.1 웹 접근성 가이드라인 (WCAG 2.1)

#### 8.1.1 색상 및 대비
```
Color Contrast Requirements:
├── Normal Text: 4.5:1 ratio minimum
├── Large Text: 3:1 ratio minimum  
├── UI Components: 3:1 ratio minimum
└── Focus Indicators: 3:1 ratio minimum

Color Independence:
├── No Information by Color Only
├── Alternative Text for Images
├── Icon + Text Combinations
└── Pattern/Shape Alternatives
```

#### 8.1.2 터치 타겟
```
Minimum Touch Targets:
├── Buttons: 44×44px minimum
├── Links: 44×44px minimum
├── Form Controls: 44×44px minimum
└── Interactive Areas: 8px spacing minimum
```

### 8.2 다국어 지원 설계

#### 8.2.1 텍스트 확장성
```
Layout Flexibility:
├── German Text: +35% space allocation
├── Chinese Text: -30% space allocation  
├── Arabic Text: RTL layout support
└── Dynamic Font Sizing
```

#### 8.2.2 이미지 현지화
```
Culturally Appropriate Images:
├── Diverse Property Types
├── Multi-cultural People
├── Local Landmarks
└── Cultural Context Examples
```

---

## 9. 성능 최적화를 위한 IA 고려사항

### 9.1 콘텐츠 우선순위 로딩

#### 9.1.1 Critical Path
```
First Paint Priority:
1. App Shell (Navigation + Header)
2. Search Bar  
3. Quick Filters
4. First Property Cards (3-5개)

Secondary Loading:
5. Additional Property Cards
6. User Recommendations
7. Non-essential Features
```

#### 9.1.2 Image Loading Strategy
```
Image Priority:
├── Above-fold Property Images: High Priority
├── Property Detail Images: Medium Priority  
├── Profile Images: Low Priority
└── Decorative Images: Lazy Load

Image Formats:
├── WebP (Primary)
├── Progressive JPEG (Fallback)
└── Low Quality Placeholders
```

### 9.2 데이터 효율성

#### 9.2.1 API Response Optimization
```
Property List Response:
├── Minimal Required Fields Only
├── Compressed Image URLs
├── Pagination (10 items/page)
└── Cached Metadata

Property Detail Response:
├── Full Property Information
├── High Resolution Images
├── Related Properties (5 items)
└── Owner Contact Information
```

---

## 10. 향후 확장 고려사항

### 10.1 중고거래 기능 확장 준비

#### 10.1.1 IA 확장 계획
```
Current Structure → Extended Structure

Property Categories → Item Categories  
├── Room/Housing → Room/Housing
└── [New] → Furniture, Electronics, etc.

Property Details → Item Details
├── Location → Location  
├── Price → Price
├── Photos → Photos
└── [New] → Condition, Brand, etc.
```

#### 10.1.2 내비게이션 확장
```
Bottom Tab Expansion:
Home | Saved | Post | Chat | Profile
  ↓
Home | Browse | Sell | Chat | Profile

Category Selection:
├── Housing (Current)
└── Marketplace (Future)
    ├── Furniture
    ├── Electronics
    ├── Clothing
    └── Other
```

### 10.2 커뮤니티 기능 통합

#### 10.2.1 정보 구조 확장
```
Additional Content Types:
├── Community Posts
├── Local Information
├── Events & Meetups
├── Tips & Guides
└── User Reviews

Navigation Integration:
├── Feed Tab (Community)
├── Local Guide Section
├── User-generated Content
└── Social Interactions
```

---

## 11. 구현 가이드라인

### 11.1 개발 우선순위

#### 11.1.1 Phase 1: Core IA (MVP)
```
Essential Screens:
├── Home Screen
├── Search Results  
├── Property Detail
├── Basic Chat
└── Simple Profile

Essential Flows:
├── Property Search
├── Property Viewing
├── Contact/Inquiry
└── User Registration
```

#### 11.1.2 Phase 2: Enhanced IA
```
Enhanced Features:
├── Advanced Filtering
├── Rich Chat Features
├── Property Management
├── Notification System
└── Improved Profile

Enhanced Flows:
├── Property Posting
├── Saved Searches
├── Advanced Messaging
└── User Preferences
```

### 11.2 컴포넌트 라이브러리 기준

#### 11.2.1 재사용 컴포넌트
```
Layout Components:
├── Screen Container
├── Section Header
├── Card Container
└── Bottom Sheet

Interactive Components:  
├── Button Variants
├── Input Fields
├── Filter Chips
├── Property Cards
└── Chat Bubbles

Navigation Components:
├── Tab Bar
├── Header Bar
├── Back Button
└── Modal Headers
```

#### 11.2.2 디자인 토큰
```
Spacing Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px
Font Scale: 12px, 14px, 16px, 18px, 20px, 24px, 28px
Color Palette: Primary, Secondary, Success, Warning, Error
Border Radius: 4px, 8px, 12px, 16px
Shadow Levels: 1dp, 2dp, 4dp, 8dp, 16dp
```

---

## 12. 측정 및 개선

### 12.1 IA 성공 지표

#### 12.1.1 사용성 지표
```
Navigation Efficiency:
├── Time to First Property View: < 30 seconds
├── Search to Result Time: < 3 seconds  
├── Property Detail Load Time: < 2 seconds
└── Message Send Success Rate: > 95%

User Engagement:
├── Session Duration: > 5 minutes average
├── Properties Viewed per Session: > 3
├── Return User Rate: > 40% (7-day)
└── Feature Discovery Rate: > 60%
```

#### 12.1.2 컨텐츠 효과성
```
Content Performance:
├── Property Card Click-through Rate: > 25%
├── Search Filter Usage: > 50% of searches
├── Saved Property Rate: > 10% of views
└── Contact Rate: > 5% of detail views

Information Architecture:
├── Task Completion Rate: > 80%
├── Navigation Error Rate: < 5%
├── User Flow Drop-off Rate: < 20% per step
└── Help/Support Request Rate: < 2%
```

### 12.2 지속적 개선 프로세스

#### 12.2.1 사용자 피드백 수집
```
Feedback Methods:
├── In-app Feedback Forms
├── User Interview (Monthly)
├── App Store Reviews Analysis
├── Support Ticket Analysis
└── Usage Analytics Review

Feedback Categories:
├── Navigation Difficulties
├── Missing Information
├── Confusing Layouts
├── Performance Issues
└── Feature Requests
```

#### 12.2.2 A/B Testing 계획
```
IA Testing Areas:
├── Property Card Layout Variations
├── Filter Organization Methods
├── Search Result Sorting Options
├── Navigation Menu Structure
└── Onboarding Flow Variations

Testing Metrics:
├── Conversion Rates
├── User Engagement
├── Task Completion
├── Error Rates
└── User Satisfaction
```

---

## 부록

### A. 화면별 컴포넌트 매핑

#### A.1 Home Screen Components
```typescript
interface HomeScreenComponents {
  header: AppHeader;
  searchBar: SearchInput;
  quickFilters: FilterChips[];
  contentSections: ContentSection[];
  propertyCards: PropertyCard[];
  bottomTab: TabNavigation;
}

interface PropertyCard {
  image: PropertyImage;
  priceInfo: PriceDisplay;
  locationInfo: LocationDisplay;
  propertyDetails: PropertyBasics;
  actions: CardActions;
}
```

#### A.2 Property Detail Components
```typescript
interface PropertyDetailComponents {
  header: DetailHeader;
  imageGallery: ImageCarousel;
  basicInfo: PropertyInfo;
  detailSections: DetailSection[];
  actionButtons: ActionBar;
}

interface DetailSection {
  title: string;
  content: React.ReactNode;
  collapsible?: boolean;
  priority: 'high' | 'medium' | 'low';
}
```

### B. 상태 관리 구조

#### B.1 Global State Structure
```typescript
interface AppState {
  user: UserState;
  properties: PropertyState;
  search: SearchState;
  chat: ChatState;
  ui: UIState;
}

interface PropertyState {
  properties: Property[];
  favorites: string[];
  currentProperty: Property | null;
  searchResults: SearchResults;
  filters: SearchFilters;
}
```

### C. 내비게이션 구조 (React Navigation)

#### C.1 Navigation Hierarchy
```typescript
RootNavigator (Stack)
├── AuthNavigator (Stack)
│   ├── Splash
│   ├── Onboarding  
│   └── Login
└── AppNavigator (Tab)
    ├── HomeStack (Stack)
    │   ├── Home
    │   ├── Search
    │   └── PropertyDetail
    ├── SavedStack (Stack)
    ├── PostStack (Stack)
    ├── ChatStack (Stack)
    └── ProfileStack (Stack)
```

---

**문서 정보:**
- **작성자**: 개발팀
- **검토자**: 프로덕트 매니저
- **승인자**: 프로젝트 리드
- **버전 관리**: Git으로 관리
- **업데이트 주기**: 스프린트별 검토 및 업데이트

**관련 문서:**
- [PRD.md](./PRD.md) - Product Requirements Document  
- [기능명세서.md](./기능명세서.md) - 기능 상세 명세
- [화면기획서.md](./화면기획서.md) - UI/UX 가이드라인