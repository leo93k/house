import { useAuthGuard } from "@/hooks/use-auth-guard";
import { ActivityIndicator, View } from "react-native";

/**
 * 인증 상태에 따라 자동 리다이렉트하는 컴포넌트
 * - 로그인 안됨: /login으로 이동
 * - 로그인 됨: /home으로 이동
 *
 * authService는 _layout.tsx에서 초기화되므로,
 * 여기서는 리다이렉트만 처리합니다.
 */
export default function IndexScreen() {
    const { isInitializing } = useAuthGuard();

    // 초기화 중일 때는 로딩 표시
    // useAuthGuard가 자동으로 리다이렉트를 처리하므로
    // 여기서는 로딩만 표시하면 됩니다
    if (isInitializing) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // 리다이렉트 중이므로 아무것도 표시하지 않음
    return null;
}
