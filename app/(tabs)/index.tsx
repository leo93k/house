import { getAuthService } from "@/service/auth/authService";
import { AuthProviderType, type User } from "@/service/auth/types";
import { useEffect, useState } from "react";
import { Alert, Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const authService = getAuthService();

    useEffect(() => {
        // 인증 상태 변경 리스너 등록
        const unsubscribe = authService.onAuthStateChanged((user) => {
            console.log({ user });
            setUser(user);
            if (initializing) setInitializing(false);
        });

        // 컴포넌트 언마운트 시 리스너 해제
        return () => {
            unsubscribe();
        };
    }, [authService, initializing]);

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
        } catch (error: any) {
            console.error("로그아웃 실패:", error);
            Alert.alert(
                "로그아웃 실패",
                error.message || "로그아웃 중 오류가 발생했습니다."
            );
        }
    };

    if (initializing) return null;

    if (user) {
        return (
            <SafeAreaView>
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
