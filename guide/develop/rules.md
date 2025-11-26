# React Native 부동산 서비스 개발 가이드

## 1. 코드 품질 및 구조

### 1.1 파일 크기 제한

-   **TSX 파일은 절대 300줄을 초과하지 않는다**
-   파일이 300줄에 가까워지면 컴포넌트를 분리하거나 로직을 추출한다
-   하나의 파일은 하나의 책임만 가져야 한다

### 1.2 컴포넌트 구조

```typescript
// ✅ 좋은 예: 작고 집중된 컴포넌트
export const PropertyCard = ({ property }: Props) => {
    // 최대 300줄 이내
};

// ❌ 나쁜 예: 거대한 컴포넌트
export const PropertyDetailScreen = () => {
    // 500줄 이상의 코드...
};
```

### 1.3 컴포넌트 재사용 원칙

**핵심 원칙: 기본 컴포넌트는 하나의 세트로 만들어두고 최대한 재사용한다**

-   **재사용 가능한 UI 컴포넌트 세트 구축**: `components/ui/` 폴더에 기본 컴포넌트 세트를 만들어두고 프로젝트 전체에서 재사용
-   **컴포넌트 라이브러리 활용**: React Native Reusables (shadcn/ui 기반) 권장, NativeBase, React Native Paper 등 UI 컴포넌트 라이브러리 사용
-   **커스텀 컴포넌트는 재사용 가능하게 설계**: 한 곳에서만 사용하는 컴포넌트도 재사용 가능하도록 설계
-   **Props를 통한 유연성 확보**: 다양한 상황에서 사용할 수 있도록 props로 커스터마이징 가능하게 설계

**재사용 체크리스트:**

-   [ ] 새로운 컴포넌트를 만들기 전에 기존 컴포넌트로 대체 가능한지 확인
-   [ ] 비슷한 컴포넌트가 여러 개 있으면 통합 가능한지 검토
-   [ ] 기본 UI 컴포넌트는 `components/ui/` 폴더에 중앙 관리
-   [ ] 컴포넌트는 props를 통해 다양한 상황에서 사용 가능하도록 설계
-   [ ] 스타일은 props로 커스터마이징 가능하게 구현

### 1.5 네이밍 컨벤션

-   **컴포넌트**: PascalCase (예: `PropertyCard.tsx`)
-   **훅**: camelCase with `use` prefix (예: `useProperty.ts`)
-   **유틸리티**: camelCase (예: `formatPrice.ts`)
-   **상수**: UPPER_SNAKE_CASE (예: `API_BASE_URL`)
-   **타입/인터페이스**: PascalCase (예: `Property`, `UserProfile`)

## 2. TypeScript 사용 규칙

### 2.1 타입 정의

-   **모든 props는 타입을 명시한다**
-   `any` 타입 사용 금지 (예외: 외부 라이브러리 타입이 없을 때만)
-   인터페이스는 `types/` 폴더에 중앙 관리

```typescript
// ✅ 좋은 예
interface PropertyCardProps {
    property: Property;
    onPress: (id: string) => void;
    showFavorite?: boolean;
}

// ❌ 나쁜 예
const PropertyCard = ({ property, onPress }: any) => {
    // ...
};
```

### 2.2 타입 안전성

-   옵셔널 체이닝(`?.`) 적극 활용
-   Nullish coalescing(`??`) 사용
-   타입 가드 함수 작성

```typescript
// ✅ 좋은 예
const price = property?.price?.deposit ?? 0;
const address = property?.address?.fullAddress ?? "주소 없음";

// ❌ 나쁜 예
const price = property.price.deposit; // 에러 가능
```

## 3. React Native 성능 최적화

### 3.1 리렌더링 최적화

-   `React.memo`로 불필요한 리렌더링 방지
-   `useMemo`로 계산 비용이 큰 값 메모이제이션
-   `useCallback`으로 함수 메모이제이션

```typescript
// ✅ 좋은 예
const PropertyCard = React.memo(({ property, onPress }: Props) => {
    const formattedPrice = useMemo(
        () => formatPrice(property.price.deposit),
        [property.price.deposit]
    );

    const handlePress = useCallback(() => {
        onPress(property.id);
    }, [property.id, onPress]);

    // ...
});

// ❌ 나쁜 예
const PropertyCard = ({ property, onPress }: Props) => {
    const formattedPrice = formatPrice(property.price.deposit); // 매번 계산
    // ...
};
```

### 3.2 리스트 최적화

-   `FlatList` 사용 (절대 `ScrollView` + `map` 사용 금지)
-   `keyExtractor` 항상 제공
-   `getItemLayout` 제공 (고정 높이일 때)
-   `removeClippedSubviews` 활성화

```typescript
// ✅ 좋은 예
<FlatList
  data={properties}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PropertyCard property={item} />}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  windowSize={5}
/>

// ❌ 나쁜 예
<ScrollView>
  {properties.map((property) => (
    <PropertyCard key={property.id} property={property} />
  ))}
</ScrollView>
```

### 3.3 이미지 최적화

-   `expo-image` 사용 (기본 `Image` 대신)
-   이미지 크기 최적화 (서버에서 썸네일 제공)
-   Lazy loading 구현
-   Placeholder 이미지 사용

```typescript
// ✅ 좋은 예
import { Image } from 'expo-image';

<Image
  source={{ uri: property.thumbnail }}
  placeholder={require('@/assets/images/placeholder.png')}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>

// ❌ 나쁜 예
<Image source={{ uri: property.fullSizeImage }} />
```

### 3.4 애니메이션 성능

-   `react-native-reanimated` 사용 (기본 Animated API 대신)
-   UI 스레드에서 실행되는 애니메이션 사용
-   `useAnimatedStyle` 활용

```typescript
// ✅ 좋은 예
import Animated, {
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isPressed.value ? 0.95 : 1) }],
}));

// ❌ 나쁜 예
import { Animated } from "react-native";
// JS 스레드에서 실행되어 성능 저하
```

## 4. 컴포넌트 재사용

### 4.1 기본 컴포넌트 세트 구축

**원칙: 기본 컴포넌트는 하나의 세트로 만들어두고 최대한 재사용한다**

#### 4.1.1 필수 기본 컴포넌트

**React Native Reusables 사용 권장**: [React Native Reusables](https://reactnativereusables.com)는 shadcn/ui를 React Native로 가져온 컴포넌트 라이브러리로, 다음 컴포넌트들을 제공합니다. CLI를 통해 필요한 컴포넌트만 프로젝트에 추가하여 사용합니다.

다음과 같은 기본 컴포넌트 세트를 `components/ui/` 폴더에 구축하고 프로젝트 전체에서 재사용:

-   **Button**: 다양한 variant (primary, secondary, text, ghost, outline)와 size 지원
-   **Input**: 텍스트 입력 필드 (label, error, placeholder 지원)
-   **Card**: 컨테이너 컴포넌트 (padding, shadow 커스터마이징)
-   **Text**: 텍스트 컴포넌트 (typography 스타일 지원)
-   **Image**: 이미지 컴포넌트 (placeholder, error 처리)
-   **Modal/Dialog**: 모달 컴포넌트
-   **Loading/Spinner**: 로딩 인디케이터
-   **Toast**: 토스트 메시지
-   **Select**: 선택 드롭다운
-   **Checkbox**: 체크박스
-   **Radio**: 라디오 버튼
-   **Switch**: 스위치 토글
-   **Tabs**: 탭 컴포넌트
-   **Sheet**: 바텀 시트
-   **Avatar**: 아바타 이미지

```typescript
// ✅ 좋은 예: 재사용 가능한 Button 컴포넌트
// components/ui/Button.tsx
interface ButtonProps {
    variant?: "primary" | "secondary" | "text" | "danger";
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
}

export const Button = ({
    variant = "primary",
    size = "medium",
    children,
    onPress,
    disabled = false,
    loading = false,
    fullWidth = false,
    ...props
}: ButtonProps) => {
    // 하나의 Button 컴포넌트로 모든 상황에서 재사용
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                styles[variant],
                styles[size],
                fullWidth && styles.fullWidth,
                (disabled || loading) && styles.disabled,
            ]}
            {...props}
        >
            {loading ? <LoadingSpinner /> : children}
        </TouchableOpacity>
    );
};

// 사용 예시
<Button variant="primary" onPress={handleLogin}>로그인</Button>
<Button variant="secondary" onPress={handleCancel}>취소</Button>
<Button variant="text" onPress={handleMore}>더보기</Button>
```

**React Native Reusables 사용 예시:**

```typescript
// React Native Reusables의 Button 컴포넌트 사용
import { Button } from "@/components/ui/button";

export default function LoginScreen() {
    return (
        <Button onPress={handleGoogleLogin} variant="default" size="lg">
            구글 로그인
        </Button>
    );
}
```

#### 4.1.2 컴포넌트 재사용 체크리스트

새로운 컴포넌트를 만들기 전에 반드시 확인:

-   [ ] 기존 `components/ui/` 폴더에 비슷한 컴포넌트가 있는가?
-   [ ] 기존 컴포넌트를 props로 커스터마이징하여 사용할 수 있는가?
-   [ ] 여러 곳에서 사용될 가능성이 있는가?
-   [ ] 컴포넌트를 재사용 가능하도록 설계할 수 있는가?

#### 4.1.3 재사용 불가능한 경우

다음과 같은 경우에만 새로운 컴포넌트를 생성:

-   기존 컴포넌트로 구현이 불가능한 특수한 기능이 필요한 경우
-   특정 기능에만 사용되는 복잡한 비즈니스 로직이 포함된 경우
-   성능상의 이유로 별도 컴포넌트가 필요한 경우

```typescript
// ✅ 좋은 예: 기능별 컴포넌트 (재사용 가능한 기본 컴포넌트 조합)
// components/features/property/PropertyCard.tsx
export const PropertyCard = ({ property }: PropertyCardProps) => {
    return (
        <Card padding="md">
            <Image source={{ uri: property.thumbnail }} />
            <Text variant="h3">{property.title}</Text>
            <Text variant="body">{formatPrice(property.price)}</Text>
            <Button variant="text" onPress={() => handleFavorite(property.id)}>
                찜하기
            </Button>
        </Card>
    );
};

// ❌ 나쁜 예: 매번 새로운 컴포넌트 생성
// 각 화면마다 다른 버튼 스타일을 가진 별도 컴포넌트 생성
export const LoginScreenButton = () => {
    /* ... */
};
export const SignupScreenButton = () => {
    /* ... */
};
export const PropertyDetailButton = () => {
    /* ... */
};
```

### 4.2 컴포넌트 조합 패턴

**원칙: 복잡한 컴포넌트는 기본 컴포넌트를 조합하여 만든다**

```typescript
// ✅ 좋은 예: 기본 컴포넌트 조합
export const PropertyCard = ({ property }: PropertyCardProps) => {
    return (
        <Card>
            <Image source={{ uri: property.thumbnail }} />
            <Text variant="h3">{property.title}</Text>
            <Text variant="body">{property.address}</Text>
            <Text variant="h2">{formatPrice(property.price)}</Text>
            <Button variant="primary" onPress={() => handleView(property.id)}>
                상세보기
            </Button>
        </Card>
    );
};

// ❌ 나쁜 예: 모든 것을 직접 구현
export const PropertyCard = ({ property }: PropertyCardProps) => {
    return (
        <View
            style={
                {
                    /* 인라인 스타일 */
                }
            }
        >
            <Image source={{ uri: property.thumbnail }} />
            <Text
                style={
                    {
                        /* 인라인 스타일 */
                    }
                }
            >
                {property.title}
            </Text>
            <TouchableOpacity
                style={
                    {
                        /* 인라인 스타일 */
                    }
                }
            >
                <Text>상세보기</Text>
            </TouchableOpacity>
        </View>
    );
};
```

### 4.3 컴포넌트 Props 설계

**원칙: 컴포넌트는 props를 통해 다양한 상황에서 사용 가능하도록 설계**

```typescript
// ✅ 좋은 예: 유연한 props 설계
interface CardProps {
    children: React.ReactNode;
    padding?: "none" | "sm" | "md" | "lg";
    shadow?: boolean;
    borderRadius?: number;
    backgroundColor?: string;
    onPress?: () => void;
}

export const Card = ({
    children,
    padding = "md",
    shadow = true,
    borderRadius = 12,
    backgroundColor = colors.white,
    onPress,
    ...props
}: CardProps) => {
    // 다양한 상황에서 재사용 가능
};

// 사용 예시
<Card padding="sm" shadow={false}>간단한 카드</Card>
<Card padding="lg" onPress={handlePress}>클릭 가능한 카드</Card>
<Card borderRadius={20} backgroundColor={colors.gray100}>커스텀 카드</Card>
```

## 5. 상태 관리

### 4.1 로컬 상태

-   간단한 상태는 `useState` 사용
-   복잡한 상태는 `useReducer` 고려

### 4.2 전역 상태

-   Context API는 적절히 사용 (과도한 사용 금지)
-   복잡한 상태는 Zustand 또는 Redux Toolkit 고려
-   서버 상태는 React Query (TanStack Query) 사용

```typescript
// ✅ 좋은 예: React Query 사용
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
});

// ❌ 나쁜 예: useState로 서버 상태 관리
const [properties, setProperties] = useState([]);
useEffect(() => {
    fetchProperties().then(setProperties);
}, []);
```

### 4.3 폼 상태

-   `react-hook-form` 사용
-   유효성 검사는 `zod` 또는 `yup` 사용

## 6. 네비게이션 (Expo Router)

### 5.1 라우팅 구조

-   파일 기반 라우팅 활용
-   동적 라우트는 `[id].tsx` 형식 사용
-   그룹 라우트는 `(group)` 형식 사용

### 5.2 네비게이션 최적화

-   `useRouter` 훅 사용
-   타입 안전한 네비게이션
-   딥링크 지원

```typescript
// ✅ 좋은 예
import { useRouter } from "expo-router";

const router = useRouter();
router.push(`/property/${propertyId}`);

// ❌ 나쁜 예
import { useNavigation } from "@react-navigation/native";
navigation.navigate("PropertyDetail", { id: propertyId });
```

## 7. API 및 데이터 페칭

### 6.1 API 서비스 구조

```
services/
  api/
    client.ts        # Axios/Fetch 인스턴스
    property.ts      # 매물 관련 API
    user.ts          # 사용자 관련 API
    auth.ts          # 인증 관련 API
```

### 6.2 에러 처리

-   모든 API 호출에 에러 핸들링 필수
-   사용자 친화적인 에러 메시지
-   네트워크 에러 처리

```typescript
// ✅ 좋은 예
try {
    const property = await fetchProperty(id);
    return property;
} catch (error) {
    if (error instanceof NetworkError) {
        showToast("네트워크 연결을 확인해주세요");
    } else {
        showToast("매물 정보를 불러올 수 없습니다");
    }
    throw error;
}
```

### 6.3 캐싱 전략

-   React Query의 캐싱 활용
-   이미지 캐싱 (expo-image의 cachePolicy)
-   오프라인 지원 고려

## 8. 스타일링

### 7.1 스타일 방식

-   StyleSheet.create 사용 (인라인 스타일 최소화)
-   공통 스타일은 `constants/theme.ts`에 정의
-   다크모드 지원

```typescript
// ✅ 좋은 예
import { StyleSheet } from "react-native";
import { colors, spacing } from "@/constants/theme";

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        backgroundColor: colors.background,
    },
});

// ❌ 나쁜 예
<View style={{ padding: 16, backgroundColor: "#fff" }} />;
```

### 7.2 반응형 디자인

-   `Dimensions` API로 화면 크기 감지
-   퍼센트 기반 크기 사용
-   다양한 화면 크기 테스트

### 7.3 테마 관리

-   다크모드/라이트모드 지원
-   색상은 테마 파일에서 중앙 관리
-   `useColorScheme` 훅 활용

## 8. 다국어 지원 (i18n)

**원칙: 외국인 대상 서비스이므로 모든 텍스트는 i18n을 통해 다국어 지원**

### 8.1 i18n 사용 규칙

-   **모든 하드코딩된 텍스트 금지**: 모든 사용자에게 보이는 텍스트는 번역 파일에 정의
-   **번역 키 네이밍**: `namespace.key` 형식 사용 (예: `login.title`, `property.search`)
-   **기본 언어**: 영어 (en)를 기본 언어로 설정
-   **지원 언어**: 영어, 중국어, 일본어 (필요에 따라 확장)

```typescript
// ✅ 좋은 예: i18n 사용
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
    const { t } = useTranslation();
    return (
        <View>
            <Text>{t("login.title")}</Text>
            <Button onPress={handleLogin}>{t("login.button")}</Button>
        </View>
    );
}

// ❌ 나쁜 예: 하드코딩된 텍스트
export default function LoginScreen() {
    return (
        <View>
            <Text>로그인</Text>
            <Button onPress={handleLogin}>구글 로그인</Button>
        </View>
    );
}
```

### 8.2 번역 파일 구조

-   **파일 구조**: `locales/{language}.json` 형식
-   **네임스페이스 분리**: 기능별로 네임스페이스 분리 (login, property, chat 등)
-   **일관성 유지**: 모든 언어 파일에 동일한 키 구조 유지

```json
// locales/en.json
{
    "common": {
        "ok": "OK",
        "cancel": "Cancel",
        "save": "Save",
        "delete": "Delete",
        "error": "An error occurred"
    },
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
        "monthlyRent": "Monthly Rent",
        "area": "Area",
        "floor": "Floor"
    }
}
```

### 8.3 동적 텍스트 처리

-   **인터폴레이션 사용**: 변수가 포함된 텍스트는 인터폴레이션 사용
-   **복수형 처리**: i18next의 복수형 기능 활용
-   **날짜/숫자 포맷팅**: 지역별 포맷팅 적용

```typescript
// ✅ 좋은 예: 인터폴레이션
const { t } = useTranslation();
const message = t("property.count", { count: properties.length });
// "property.count": "{{count}} properties found"

// ✅ 좋은 예: 날짜 포맷팅
import { format } from "date-fns";
import { enUS, zhCN, jaJP } from "date-fns/locale";

const locales = { en: enUS, zh: zhCN, ja: jaJP };
const formattedDate = format(new Date(), "PPP", {
    locale: locales[i18n.language],
});
```

### 8.4 언어 전환

-   **언어 선택 UI**: 설정 화면에 언어 선택 기능 제공
-   **즉시 반영**: 언어 변경 시 즉시 UI 업데이트
-   **저장**: 선택한 언어를 AsyncStorage에 저장하여 다음 실행 시 유지

```typescript
// ✅ 좋은 예: 언어 전환
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
    const { i18n } = useTranslation();

    const changeLanguage = async (lang: string) => {
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem("userLanguage", lang);
    };

    return (
        <View>
            <Button onPress={() => changeLanguage("en")}>English</Button>
            <Button onPress={() => changeLanguage("zh")}>中文</Button>
            <Button onPress={() => changeLanguage("ja")}>日本語</Button>
        </View>
    );
}
```

### 8.5 번역 체크리스트

-   [ ] 모든 화면의 텍스트가 번역 파일에 정의되어 있는가?
-   [ ] 에러 메시지가 번역되어 있는가?
-   [ ] 모든 언어 파일에 동일한 키가 존재하는가?
-   [ ] 누락된 번역이 없는가?
-   [ ] 언어 전환 시 UI가 즉시 업데이트되는가?

## 9. 접근성 (Accessibility)

### 9.1 필수 접근성 속성

-   모든 버튼에 `accessibilityLabel` 제공
-   이미지에 `accessibilityLabel` 또는 `accessibilityRole="image"` 제공
-   터치 영역 최소 44x44pt 유지

```typescript
// ✅ 좋은 예
<TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={t("property.favorite")}
    accessibilityHint={t("property.favoriteHint")}
>
    <Icon name="heart" />
</TouchableOpacity>
```

## 10. 테스트

### 10.1 테스트 전략

-   단위 테스트: 유틸리티 함수, 훅
-   컴포넌트 테스트: 주요 UI 컴포넌트
-   통합 테스트: 주요 사용자 플로우

### 10.2 테스트 도구

-   Jest: 단위 테스트
-   React Native Testing Library: 컴포넌트 테스트
-   Detox: E2E 테스트 (선택)

## 11. 코드 리뷰 체크리스트

### 11.1 필수 확인 사항

-   [ ] 파일 크기가 300줄 이하인가?
-   [ ] TypeScript 타입이 모두 정의되어 있는가?
-   [ ] `any` 타입이 사용되지 않았는가?
-   [ ] 불필요한 리렌더링이 없는가?
-   [ ] `FlatList`를 사용했는가? (리스트의 경우)
-   [ ] 에러 처리가 되어 있는가?
-   [ ] 접근성 속성이 제공되는가?
-   [ ] 성능 최적화가 적용되었는가?
-   [ ] **기존 컴포넌트를 재사용할 수 있는지 확인했는가?**
-   [ ] **새로운 컴포넌트를 만들기 전에 기존 컴포넌트로 대체 가능한지 확인했는가?**
-   [ ] **컴포넌트가 재사용 가능하도록 설계되었는가?**
-   [ ] **모든 텍스트가 i18n을 통해 다국어 지원되는가?**
-   [ ] **하드코딩된 텍스트가 없는가?**

### 11.2 성능 체크리스트

-   [ ] 이미지 최적화가 되어 있는가?
-   [ ] 리스트에 `keyExtractor`가 있는가?
-   [ ] 메모이제이션이 필요한 곳에 적용되었는가?
-   [ ] 애니메이션이 UI 스레드에서 실행되는가?

## 12. Git 및 버전 관리

### 12.1 커밋 메시지

-   명확하고 간결한 커밋 메시지
-   컨벤셔널 커밋 형식 사용

```
feat: 매물 상세 화면 추가
fix: 지도 마커 클릭 이벤트 수정
refactor: PropertyCard 컴포넌트 분리
perf: 이미지 로딩 성능 개선
```

### 12.2 브랜치 전략

-   `main`: 프로덕션 브랜치
-   `develop`: 개발 브랜치
-   `feature/`: 기능 개발 브랜치
-   `fix/`: 버그 수정 브랜치

## 13. 보안

### 13.1 민감 정보 관리

-   API 키는 환경 변수로 관리
-   `.env` 파일은 `.gitignore`에 추가
-   하드코딩된 비밀번호/토큰 금지

### 13.2 입력 검증

-   모든 사용자 입력 검증
-   XSS 방지
-   SQL Injection 방지 (백엔드)

## 14. 성능 모니터링

### 14.1 성능 측정

-   React DevTools Profiler 사용
-   Flipper로 성능 모니터링
-   메모리 누수 확인

### 14.2 최적화 목표

-   초기 로딩 시간: 3초 이하
-   화면 전환: 60fps 유지
-   메모리 사용량: 적절한 수준 유지

## 15. 플랫폼별 고려사항

### 15.1 iOS

-   Safe Area 처리
-   iOS 네비게이션 바 스타일
-   터치 피드백 (Haptic Feedback)

### 15.2 Android

-   Material Design 가이드라인
-   뒤로가기 버튼 처리
-   상태바 스타일

### 15.3 공통

-   키보드 처리 (`KeyboardAvoidingView`)
-   Pull to Refresh
-   무한 스크롤

## 16. 문서화

### 16.1 코드 주석

-   복잡한 로직에 주석 추가
-   함수/컴포넌트에 JSDoc 주석
-   TODO 주석은 이슈로 추적

```typescript
/**
 * 매물 가격을 포맷팅합니다.
 * @param deposit - 보증금 (원)
 * @param monthlyRent - 월세 (원)
 * @returns 포맷팅된 가격 문자열 (예: "보증금 1,000만원 / 월세 50만원")
 */
export const formatPrice = (deposit: number, monthlyRent: number): string => {
    // ...
};
```

### 16.2 README

-   프로젝트 설정 방법
-   주요 기능 설명
-   개발 환경 설정

## 17. 디버깅

### 17.1 디버깅 도구

-   React Native Debugger
-   Flipper
-   Chrome DevTools
-   React DevTools

### 17.2 로깅

-   개발 환경에서만 상세 로그
-   프로덕션에서는 에러 로그만
-   로그 레벨 구분 (debug, info, warn, error)

```typescript
// ✅ 좋은 예
if (__DEV__) {
    console.log("Property data:", property);
}

// 프로덕션에서는
logger.error("Failed to fetch property", { error, propertyId });
```

## 18. 의존성 관리

### 18.1 패키지 선택

-   유지보수가 활발한 패키지 선택
-   번들 크기 고려
-   네이티브 모듈은 신중하게 선택

### 18.2 버전 관리

-   `package.json`에 정확한 버전 명시
-   `yarn` 사용 (npm 대신)
-   정기적인 의존성 업데이트

## 19. 에러 바운더리

### 19.1 에러 처리

-   에러 바운더리 컴포넌트 구현
-   사용자 친화적인 에러 화면
-   에러 리포팅 (Sentry 등)

```typescript
// ✅ 좋은 예
class ErrorBoundary extends React.Component {
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error("Component error", { error, errorInfo });
        // 에러 리포팅 서비스에 전송
    }

    render() {
        if (this.state.hasError) {
            return <ErrorScreen onRetry={this.handleRetry} />;
        }
        return this.props.children;
    }
}
```

## 20. 코드 리뷰 문화

### 20.1 리뷰 원칙

-   건설적인 피드백
-   코드 품질 우선
-   학습 기회로 활용

### 20.2 리뷰 포인트

-   기능이 요구사항을 만족하는가?
-   코드가 읽기 쉬운가?
-   성능 문제가 없는가?
-   보안 문제가 없는가?
-   테스트가 있는가?

## 21. 지속적인 개선

### 21.1 리팩토링

-   정기적인 코드 리뷰
-   기술 부채 관리
-   아키텍처 개선

### 21.2 학습

-   최신 React Native 패턴 학습
-   성능 최적화 기법 연구
-   커뮤니티 베스트 프랙티스 참고

---

**이 가이드는 프로젝트 진행 중 지속적으로 업데이트됩니다.**

**작성일**: 2024년
**버전**: 1.0
