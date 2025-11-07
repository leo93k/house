# 개발 스택 추천

## 1. 권장 스택 요약

### 필수 스택 (Must Have)

**프론트엔드:**

-   [React Native + Expo](#21-핵심-프레임워크)
-   [Expo Router](#23-네비게이션)
-   [Zustand (상태 관리)](#22-상태-관리)
-   [React Query (서버 상태)](#22-상태-관리)
-   [카카오맵 SDK (지도)](#24-지도-및-위치)
-   [expo-image (이미지)](#25-이미지-처리)
-   [React Hook Form + Zod (폼)](#26-폼-관리)
-   [react-native-reanimated (애니메이션)](#27-애니메이션)
-   [i18next (다국어 지원)](#29-다국어-지원-i18n)

**백엔드:**

-   [Node.js + Express](#31-api-서버)
-   [PostgreSQL + Prisma](#32-데이터베이스)
-   [JWT (인증)](#33-인증)
-   [AWS S3 (파일 저장)](#34-파일-저장소)

**외부 서비스:**

-   [카카오맵 API](#41-지도-api)
-   [FCM (푸시 알림)](#43-푸시-알림)
-   [Sentry (에러 리포팅)](#44-에러-리포팅)

### 선택 스택 (Nice to Have)

-   [Firebase Analytics (분석)](#45-분석)
-   [Socket.io (실시간 채팅)](#35-실시간-통신)
-   [React Native Reusables (UI 컴포넌트)](#28-ui-컴포넌트)
-   [Detox (E2E 테스트)](#52-테스트)
-   [Storybook (컴포넌트 개발)](#53-컴포넌트-개발)

## 2. 프론트엔드 (React Native)

### 2.1 핵심 프레임워크

#### ✅ React Native + Expo (권장)

-   **이유**: 현재 프로젝트가 이미 Expo를 사용 중이며, 빠른 개발과 배포가 가능
-   **버전**: Expo SDK 54 (현재 사용 중)
-   **장점**:
    -   OTA 업데이트 지원
    -   네이티브 모듈 관리 용이
    -   빌드 프로세스 간소화

#### 📦 필수 패키지

```json
{
    "expo": "~54.0.22",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "expo-router": "~6.0.14"
}
```

### 2.2 상태 관리

#### ✅ Zustand (권장)

-   **이유**: 가볍고 사용하기 쉬움, TypeScript 지원 우수
-   **설치**: `yarn add zustand`
-   **사용 케이스**: 전역 상태 (사용자 정보, 필터 상태 등)

```typescript
// 예시: 필터 상태 관리
import { create } from "zustand";

interface FilterState {
    region: string;
    propertyType: string;
    priceRange: { min: number; max: number };
    setRegion: (region: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    region: "",
    propertyType: "",
    priceRange: { min: 0, max: 100000000 },
    setRegion: (region) => set({ region }),
}));
```

#### ✅ React Query (TanStack Query) (권장)

-   **이유**: 서버 상태 관리에 최적화, 캐싱 및 동기화 자동 처리
-   **설치**: `yarn add @tanstack/react-query`
-   **사용 케이스**: API 데이터 페칭, 캐싱, 무한 스크롤

```typescript
// 예시: 매물 목록 조회
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 5 * 60 * 1000, // 5분
});
```

#### ⚠️ Context API

-   **사용 케이스**: 테마, 다크모드 등 간단한 전역 상태
-   **주의**: 과도한 사용 시 성능 저하 가능

### 2.3 네비게이션

#### ✅ Expo Router (권장 - 현재 사용 중)

-   **이유**: 파일 기반 라우팅, 타입 안전성, 딥링크 지원
-   **버전**: `~6.0.14`
-   **장점**:
    -   Next.js와 유사한 경험
    -   자동 코드 스플리팅
    -   타입 안전한 네비게이션

### 2.4 지도 및 위치

#### ✅ 카카오맵 SDK (권장)

-   **이유**: 한국 시장 특화 기능, 네이티브 지도 렌더링, 정확한 주소 검색
-   **사용 케이스**: 지도 표시, 마커, 클러스터링, 길찾기, 주변 검색
-   **장점**:
    -   카카오맵 네이티브 지도 렌더링 (부드러운 성능)
    -   한국 주소 검색 정확도 높음
    -   카카오맵 특화 기능 (길찾기, 주변 검색 등)
    -   한국 사용자에게 친숙한 UI/UX
-   **단점**: 네이티브 모듈 설정 필요, iOS/Android 별도 설정, Expo Go에서 테스트 불가
-   **설치**:
    -   iOS: CocoaPods를 통한 네이티브 모듈 설치
    -   Android: Gradle을 통한 네이티브 모듈 설치
    -   Expo: `npx expo prebuild` 후 네이티브 모듈 추가 필요
-   **참고**: Expo managed workflow에서는 사용 불가, bare workflow 또는 custom development client 필요

#### ✅ expo-location

-   **이유**: 현재 위치 조회, 권한 관리
-   **설치**: `npx expo install expo-location`
-   **사용 케이스**: 사용자 현재 위치 조회, 위치 기반 검색

### 2.5 이미지 처리

#### ✅ expo-image (권장 - 현재 사용 중)

-   **이유**: 최적화된 이미지 로딩, 캐싱, 플레이스홀더 지원
-   **버전**: `~3.0.10`
-   **장점**:
    -   자동 이미지 최적화
    -   메모리 효율적
    -   WebP 지원

```typescript
import { Image } from "expo-image";

<Image
    source={{ uri: property.thumbnail }}
    placeholder={require("@/assets/images/placeholder.png")}
    contentFit="cover"
    transition={200}
    cachePolicy="memory-disk"
/>;
```

#### ✅ expo-image-picker

-   **이유**: 매물 사진 업로드
-   **설치**: `npx expo install expo-image-picker`

### 2.6 폼 관리

#### ✅ React Hook Form (권장)

-   **이유**: 성능 최적화, 유효성 검사 통합
-   **설치**: `yarn add react-hook-form`
-   **유효성 검사**: `yarn add zod` 또는 `yarn add yup`

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, "제목을 입력해주세요"),
    deposit: z.number().min(0),
    monthlyRent: z.number().min(0),
});

const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
});
```

### 2.7 애니메이션

#### ✅ react-native-reanimated (권장 - 현재 사용 중)

-   **이유**: UI 스레드에서 실행, 60fps 보장
-   **버전**: `~4.1.1`
-   **사용 케이스**: 화면 전환, 인터랙션 애니메이션

#### ✅ react-native-gesture-handler (현재 사용 중)

-   **이유**: 제스처 처리 최적화
-   **버전**: `~2.28.0`

### 2.8 UI 컴포넌트

#### ✅ React Native Reusables (권장)

-   **설치**: CLI를 통한 컴포넌트 추가 방식
-   **공식 사이트**: [reactnativereusables.com](https://reactnativereusables.com)
-   **GitHub**: [founded-labs/react-native-reusables](https://github.com/founded-labs/react-native-reusables)
-   **이유**:
    -   shadcn/ui를 React Native로 가져온 컴포넌트 라이브러리
    -   NativeWind 기반으로 스타일링
    -   오픈소스이며 커뮤니티가 활발함 (7.3k+ stars)
    -   컴포넌트를 직접 프로젝트에 복사하여 사용 (코드 소유권)
    -   커스터마이징이 자유로움
    -   Radix UI 기반으로 접근성 우수
    -   TypeScript 완전 지원
-   **설치 방법**:

    ```bash
    # CLI 설치
    npx shadcn-ui@latest init

    # 컴포넌트 추가 (예: Button)
    npx shadcn-ui@latest add button
    ```

-   **필수 의존성**:
    -   NativeWind (Tailwind CSS for React Native)
    -   React Native Reanimated
    -   React Native Gesture Handler
-   **사용 예시**:

    ```typescript
    import { Button } from "@/components/ui/button";

    export default function LoginScreen() {
        return <Button onPress={handleLogin}>구글 로그인</Button>;
    }
    ```

#### ✅ NativeBase 또는 React Native Paper (대안)

-   **NativeBase**: `yarn add native-base`
-   **React Native Paper**: `yarn add react-native-paper`
-   **이유**: Material Design 컴포넌트, 접근성 지원

#### ✅ React Native Elements (대안)

-   **설치**: `yarn add react-native-elements react-native-vector-icons`

### 2.9 다국어 지원 (i18n)

#### ✅ react-i18next (권장)

-   **이유**: React Native에서 가장 널리 사용되는 i18n 라이브러리, TypeScript 지원 우수
-   **설치**: `yarn add react-i18next i18next react-native-localize`
-   **지원 언어**: 영어, 중국어, 일본어, 베트남어, 태국어 등 (외국인 타겟에 맞춰 확장 가능)
-   **장점**:
    -   플러그인 생태계 풍부
    -   네임스페이스 지원 (번역 파일 분리)
    -   복수형 처리 지원
    -   날짜/숫자 포맷팅 통합
    -   언어 감지 자동화
-   **설정 예시**:

```typescript
// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
        en: { translation: en },
        zh: { translation: zh },
        ja: { translation: ja },
    },
    lng: Localization.locale.split("-")[0] || "en", // 디바이스 언어 감지
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
```

-   **사용 예시**:

```typescript
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
    const { t, i18n } = useTranslation();

    return (
        <View>
            <Text>{t("login.title")}</Text>
            <Button onPress={handleLogin}>{t("login.button")}</Button>
            <Button onPress={() => i18n.changeLanguage("en")}>
                English
            </Button>
            <Button onPress={() => i18n.changeLanguage("zh")}>
                中文
            </Button>
            <Button onPress={() => i18n.changeLanguage("ja")}>
                日本語
            </Button>
        </View>
    );
}
```

-   **번역 파일 구조**:

```json
// locales/en.json
{
    "login": {
        "title": "Login",
        "button": "Sign in with Google",
        "error": "Login failed"
    },
    "property": {
        "search": "Search Properties",
        "filter": "Filter",
        "price": "Price",
        "deposit": "Deposit",
        "monthlyRent": "Monthly Rent"
    }
}
```

```json
// locales/zh.json
{
    "login": {
        "title": "登录",
        "button": "使用 Google 登录",
        "error": "登录失败"
    },
    "property": {
        "search": "搜索房产",
        "filter": "筛选",
        "price": "价格",
        "deposit": "保证金",
        "monthlyRent": "月租"
    }
}
```

-   **필수 의존성**:
    -   `expo-localization`: 디바이스 언어 감지
    -   `react-native-localize`: 언어 감지 및 지역 설정

#### ✅ expo-localization

-   **이유**: 디바이스 언어 및 지역 정보 감지
-   **설치**: `npx expo install expo-localization`
-   **사용 케이스**: 앱 시작 시 사용자 언어 자동 감지

```typescript
import * as Localization from "expo-localization";

// 디바이스 언어 감지
const locale = Localization.locale; // 예: "en-US", "zh-CN", "ja-JP"
const language = locale.split("-")[0]; // "en", "zh", "ja"
```

### 2.10 유틸리티

#### ✅ date-fns

-   **이유**: 날짜 포맷팅
-   **설치**: `yarn add date-fns`

#### ✅ react-native-super-grid

-   **이유**: 그리드 레이아웃
-   **설치**: `yarn add react-native-super-grid`

#### ✅ react-native-snap-carousel (또는 react-native-reanimated-carousel)

-   **이유**: 이미지 갤러리 캐러셀
-   **설치**: `yarn add react-native-reanimated-carousel`

## 3. 백엔드

### 3.1 API 서버

#### ✅ Node.js + Express (권장)

-   **이유**: JavaScript 생태계 일관성, 빠른 개발
-   **설치**: `yarn add express cors dotenv`
-   **타입**: `yarn add -D @types/express @types/cors`

#### ✅ Node.js + Fastify (대안)

-   **이유**: Express보다 빠른 성능
-   **설치**: `yarn add fastify`

#### ⚠️ Python + FastAPI (대안)

-   **이유**: 데이터 분석, ML 기능 확장 시 유리
-   **단점**: 언어 스택 분리

### 3.2 데이터베이스

#### ✅ PostgreSQL (권장)

-   **이유**: 관계형 데이터, 복잡한 쿼리, ACID 보장
-   **ORM**: Prisma 또는 TypeORM
-   **Prisma 설치**: `yarn add prisma @prisma/client`

```typescript
// Prisma 예시
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProperties = async (filters: FilterOptions) => {
    return prisma.property.findMany({
        where: {
            deposit: { gte: filters.minDeposit, lte: filters.maxDeposit },
            propertyType: filters.propertyType,
        },
        include: {
            user: true,
            address: true,
        },
    });
};
```

#### ⚠️ MongoDB (대안)

-   **이유**: 유연한 스키마, 빠른 개발
-   **ODM**: Mongoose
-   **단점**: 복잡한 관계형 쿼리 어려움

### 3.3 인증

#### ✅ JWT (권장)

-   **이유**: Stateless, 확장성
-   **설치**: `yarn add jsonwebtoken bcrypt`
-   **타입**: `yarn add -D @types/jsonwebtoken @types/bcrypt`

#### ✅ Firebase Auth (대안)

-   **이유**: 소셜 로그인 간편, 관리 용이
-   **단점**: Firebase 의존성

### 3.4 파일 저장소

#### ✅ AWS S3 (권장)

-   **이유**: 확장성, 안정성
-   **SDK**: `yarn add @aws-sdk/client-s3`

#### ✅ Cloudinary (대안)

-   **이유**: 이미지 최적화 자동 처리
-   **SDK**: `yarn add cloudinary`

### 3.5 실시간 통신

#### ✅ Socket.io (권장)

-   **이유**: 양방향 통신, 채팅 기능
-   **설치**: `yarn add socket.io socket.io-client`

#### ✅ WebSocket (대안)

-   **이유**: 경량, 네이티브 지원
-   **단점**: 직접 구현 필요

## 4. 외부 서비스

### 4.1 지도 API

#### ✅ 카카오맵 API (권장)

-   **이유**: 한국 시장 특화, 정확한 주소 검색
-   **사용**: REST API, JavaScript API
-   **비용**: 무료 (일일 호출 제한)
-   **사용 케이스**:
    -   주소 검색 (다음 주소 API)
    -   좌표 → 주소 변환 (Geocoding)
    -   주소 → 좌표 변환 (Reverse Geocoding)
    -   주변 검색 (편의시설, 대중교통 등)
-   **참고**: 카카오맵 SDK와 함께 사용 (지도 표시는 카카오맵 SDK, 주소 검색은 카카오맵 API)

#### ✅ 네이버맵 API (대안)

-   **이유**: 카카오맵 대안
-   **비용**: 무료 (일일 호출 제한)

### 4.2 주소 검색

#### ✅ 다음 주소 API (권장)

-   **이유**: 정확한 주소 검색, 우편번호 제공
-   **사용**: REST API

### 4.3 푸시 알림

#### ✅ Firebase Cloud Messaging (FCM) (권장)

-   **이유**: 크로스 플랫폼, 무료
-   **설치**: `npx expo install expo-notifications`

### 4.4 에러 리포팅

#### ✅ Sentry (권장)

-   **이유**: 상세한 에러 추적, 성능 모니터링
-   **설치**: `yarn add @sentry/react-native`

### 4.5 분석

#### ✅ Firebase Analytics (권장)

-   **이유**: 무료, 사용자 행동 분석
-   **설치**: `npx expo install expo-firebase-analytics`

#### ✅ Mixpanel (대안)

-   **이유**: 고급 분석 기능

## 5. 개발 도구

### 5.1 코드 품질

#### ✅ ESLint (현재 사용 중)

-   **설정**: `eslint-config-expo`

#### ✅ Prettier

-   **설치**: `yarn add -D prettier`
-   **설정**: `.prettierrc`

#### ✅ Husky

-   **이유**: Git hooks 자동화
-   **설치**: `yarn add -D husky lint-staged`

### 5.2 테스트

#### ✅ Jest (권장)

-   **이유**: React Native 기본 테스트 프레임워크
-   **설치**: `yarn add -D jest @testing-library/react-native`

#### ✅ React Native Testing Library

-   **이유**: 컴포넌트 테스트
-   **설치**: `yarn add -D @testing-library/react-native`

#### ✅ Detox (E2E 테스트)

-   **이유**: 실제 디바이스 테스트
-   **설치**: `yarn add -D detox`

### 5.3 컴포넌트 개발

#### ✅ Storybook (권장)

-   **이유**: UI 컴포넌트 독립 개발 및 테스트, 컴포넌트 문서화
-   **설치**: `npx storybook@latest init`
-   **사용 케이스**:
    -   컴포넌트를 앱과 분리하여 독립적으로 개발
    -   다양한 props 조합으로 컴포넌트 테스트
    -   컴포넌트 라이브러리 문서화
    -   디자이너와 개발자 간 협업
-   **장점**:
    -   컴포넌트를 다양한 상태로 시각화
    -   인터랙션 테스트 가능
    -   컴포넌트 문서 자동 생성
    -   디자인 시스템 구축에 유용
-   **참고**: React Native용 Storybook은 `@storybook/react-native` 사용

### 5.4 타입 체킹

#### ✅ TypeScript (현재 사용 중)

-   **버전**: `5.9.2`
-   **설정**: `tsconfig.json`

## 6. 배포 및 인프라

### 6.1 모바일 앱 배포

#### ✅ EAS Build (권장)

-   **이유**: Expo 공식 빌드 서비스
-   **설치**: `yarn add -D eas-cli`

#### ✅ App Store / Google Play

-   **iOS**: App Store Connect
-   **Android**: Google Play Console

### 6.2 백엔드 배포

#### ✅ Vercel (권장 - Node.js)

-   **이유**: 무료, 자동 배포, Edge Functions

#### ✅ Railway (대안)

-   **이유**: 간편한 배포, 데이터베이스 포함

#### ✅ AWS (프로덕션)

-   **이유**: 확장성, 안정성
-   **서비스**: EC2, Lambda, RDS

### 6.3 데이터베이스 호스팅

#### ✅ Supabase (권장)

-   **이유**: PostgreSQL 무료 티어, 실시간 기능

#### ✅ AWS RDS (프로덕션)

-   **이유**: 확장성, 백업 자동화

## 7. 설치 명령어

### 프론트엔드 필수 패키지

```bash
# 상태 관리
yarn add zustand @tanstack/react-query

# 지도 및 위치
npx expo install expo-location
# 카카오맵 SDK는 네이티브 모듈이므로 별도 설치 필요 (bare workflow)

# 폼
yarn add react-hook-form zod @hookform/resolvers

# 이미지
npx expo install expo-image-picker

# UI 컴포넌트
yarn add native-base react-native-safe-area-context

# 다국어 지원 (i18n)
yarn add react-i18next i18next react-native-localize
npx expo install expo-localization

# 유틸리티
yarn add date-fns react-native-reanimated-carousel

# 에러 리포팅
yarn add @sentry/react-native

# 푸시 알림
npx expo install expo-notifications
```

### 개발 도구

```bash
# 코드 품질
yarn add -D prettier eslint-config-prettier
yarn add -D husky lint-staged

# 테스트
yarn add -D @testing-library/react-native @testing-library/jest-native

# 컴포넌트 개발
npx storybook@latest init
```

---

**작성일**: 2024년
**버전**: 1.0
**업데이트**: 프로젝트 진행에 따라 지속적으로 업데이트
