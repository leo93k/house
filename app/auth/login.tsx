import { getAuthService } from "@/service/auth";
import { AuthProviderType } from "@/service/auth/types";
import { useUserStore } from "@/store";
import { useEffect } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

const LoginScreen = () => {
    const { isInitializing } = useUserStore();
    const authService = getAuthService();

    useEffect(() => {
        console.log(process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB);
        // auth state 변경 감지 (로그인 성공 시 리다이렉트는 useAuthGuard에서 처리됨)
        const unsubscribe = authService.onAuthStateChanged(() => {
            // 로그인 성공 시 리다이렉트는 useAuthGuard에서 처리됨
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSignin = async () => {
        try {
            await authService.signIn(AuthProviderType.GOOGLE);
            // 로그인 성공 시 리다이렉트는 useAuthGuard에서 처리됨
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    // 초기화 중이면 로딩 화면 표시
    if (isInitializing) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View
            className="flex-1 items-center justify-center"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View>
                {(() => {
                    const GoogleButton = authService
                        .getProvider(AuthProviderType.GOOGLE)
                        ?.getSignInButton?.(onSignin);
                    return GoogleButton ? (
                        <GoogleButton onPress={onSignin} />
                    ) : (
                        <Button
                            title="Sign In with Google"
                            onPress={onSignin}
                        />
                    );
                })()}
            </View>

            <Text>login12312312</Text>
        </View>
    );
};

export default LoginScreen;
