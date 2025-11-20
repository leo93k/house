import { getAuthService } from "@/service/auth";
import { AuthProviderType } from "@/service/auth/types";
import { useUserStore } from "@/store";
import { useEffect } from "react";
import { Button, View } from "react-native";

const LoginScreen = () => {
    const { isInitializing } = useUserStore();
    const authService = getAuthService();

    useEffect(() => {
        // auth state 변경 감지 (로그인 성공 시 리다이렉트는 useAuthGuard에서 처리됨)
        const unsubscribe = authService.onAuthStateChanged(() => {
            // 로그인 성공 시 리다이렉트는 useAuthGuard에서 처리됨
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onGoogleSignIn = async () => {
        try {
            await authService.signIn(AuthProviderType.GOOGLE);
            // 로그인 성공 시 리다이렉트는 useAuthGuard에서 처리됨
        } catch (error) {
            console.error("Google Sign in error:", error);
        }
    };

    const onAppleSignIn = async () => {
        try {
            await authService.signIn(AuthProviderType.APPLE);
            // 로그인 성공 시 리다이렉트는 useAuthGuard에서 처리됨
        } catch (error) {
            console.error("Apple Sign in error:", error);
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
                <Button title="Loading..." disabled />
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
                gap: 20,
            }}
        >
            <View>
                {(() => {
                    const GoogleButton = authService
                        .getProvider(AuthProviderType.GOOGLE)
                        ?.getSignInButton?.(onGoogleSignIn);
                    return GoogleButton ? (
                        <GoogleButton onPress={onGoogleSignIn} />
                    ) : (
                        <Button
                            title="Sign In with Google"
                            onPress={onGoogleSignIn}
                        />
                    );
                })()}
            </View>

            <View>
                {(() => {
                    const AppleButton = authService
                        .getProvider(AuthProviderType.APPLE)
                        ?.getSignInButton?.(onAppleSignIn);
                    return AppleButton ? (
                        <AppleButton onPress={onAppleSignIn} />
                    ) : (
                        <Button
                            title="Sign In with Apple"
                            onPress={onAppleSignIn}
                        />
                    );
                })()}
            </View>
        </View>
    );
};

export default LoginScreen;
