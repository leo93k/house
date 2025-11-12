import { ScreenView } from "@/components";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getAuthService } from "@/service/auth/authService";
import { AuthProviderType } from "@/service/auth/types";
import * as AppleAuthentication from "expo-apple-authentication";
import { Alert, Button, StyleSheet } from "react-native";

export default function LoginScreen() {
    const authService = getAuthService();
    const { user } = useAuthGuard();
    const colorScheme = useColorScheme();

    const handleGoogleSignIn = async () => {
        try {
            await authService.signIn(AuthProviderType.GOOGLE);
            // 로그인 성공 시 authService의 onAuthStateChanged가 자동으로
            // store를 업데이트하고, 위의 useEffect가 /home으로 리다이렉트함
        } catch (error: any) {
            console.error("로그인 실패:", error);
            Alert.alert(
                "로그인 실패",
                error.message || "로그인 중 오류가 발생했습니다."
            );
        }
    };

    const googleProvider = authService.getProvider(AuthProviderType.GOOGLE);
    const SignInButtonComponent =
        googleProvider?.getSignInButton?.(handleGoogleSignIn);

    // 이미 로그인되어 있으면 리다이렉트 중이므로 아무것도 표시하지 않음
    if (user) {
        return null;
    }

    return (
        <ScreenView style={{ justifyContent: "center", alignItems: "center" }}>
            {SignInButtonComponent ? (
                <SignInButtonComponent onPress={handleGoogleSignIn} />
            ) : (
                <Button title="Google 로그인" onPress={handleGoogleSignIn} />
            )}

            <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                    AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                buttonStyle={
                    AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={5}
                style={styles.button}
                onPress={async () => {
                    try {
                        const credential =
                            await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                    AppleAuthentication.AppleAuthenticationScope
                                        .FULL_NAME,
                                    AppleAuthentication.AppleAuthenticationScope
                                        .EMAIL,
                                ],
                            });
                        // signed in
                    } catch (e) {
                        if (e.code === "ERR_REQUEST_CANCELED") {
                            // handle that the user canceled the sign-in flow
                        } else {
                            // handle other errors
                        }
                    }
                }}
            />
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 200,
        height: 44,
    },
});
