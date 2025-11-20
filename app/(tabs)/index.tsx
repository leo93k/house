import { getAuthService } from "@/service/auth";
import { AuthProviderType } from "@/service/auth/types";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const [user, setUser] = useState<any>(null);
    const authService = getAuthService();

    useEffect(() => {
        // 초기 사용자 정보 가져오기
        authService.getCurrentUser().then((currentUser) => {
            setUser(currentUser);
        });

        // auth state 변경 감지
        const unsubscribe = authService.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSignin = async () => {
        try {
            await authService.signIn(AuthProviderType.GOOGLE);
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    const onSignOut = async () => {
        try {
            await authService.signOut();
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <SafeAreaView>
            <View
                className="flex-1 items-center justify-center"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View>
                    {user ? (
                        <Button title="Sign Out" onPress={onSignOut} />
                    ) : (
                        (() => {
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
                        })()
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
