import { getAuthService } from "@/service/auth/authService";
import { AuthProviderType } from "@/service/auth/types";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { Alert, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const { user, isInitializing, setUser, setInitializing } = useUserStore();
    console.log({ user, isInitializing });
    const authService = getAuthService();

    // 초기화 확인
    useEffect(() => {
        if (isInitializing) {
            // 현재 사용자 상태 확인
            authService
                .getCurrentUser()
                .then((currentUser) => {
                    if (currentUser) {
                        setUser(currentUser);
                    }
                    setInitializing(false);
                })
                .catch((error) => {
                    console.error("초기 사용자 확인 실패:", error);
                    setInitializing(false);
                });
        }
    }, [isInitializing, authService, setUser, setInitializing]);

    const handleSignIn = async () => {
        try {
            await authService.signIn(AuthProviderType.GOOGLE);
        } catch (error: any) {
            console.error("로그인 실패:", error);
            Alert.alert(
                "로그인 실패",
                error.message || "로그인 중 오류가 발생했습니다."
            );
        }
    };

    const handleSignOut = async () => {
        try {
            await authService.signOut();
            // authService의 onAuthStateChanged가 자동으로 store를 업데이트하므로
            // clearUser()는 필요 없음 (하지만 명시적으로 호출해도 무방)
        } catch (error: any) {
            console.error("로그아웃 실패:", error);
            Alert.alert(
                "로그아웃 실패",
                error.message || "로그아웃 중 오류가 발생했습니다."
            );
        }
    };

    if (isInitializing)
        return (
            <SafeAreaView>
                <Text>isInitializing</Text>
            </SafeAreaView>
        );

    if (user) {
        return (
            <SafeAreaView>
                <Text>123</Text>
                <Text>{user.email}</Text>
                <Button title="Sign Out" onPress={handleSignOut} />
            </SafeAreaView>
        );
    } else {
        const googleProvider = authService.getProvider(AuthProviderType.GOOGLE);
        const SignInButtonComponent =
            googleProvider?.getSignInButton?.(handleSignIn);

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {SignInButtonComponent ? (
                    <SignInButtonComponent onPress={handleSignIn} />
                ) : (
                    <Button title="Google 로그인" onPress={handleSignIn} />
                )}
            </SafeAreaView>
        );
    }
}
