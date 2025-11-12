import { ScreenView } from "@/components";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { getAuthService } from "@/service/auth/authService";
import { AuthProviderType } from "@/service/auth/types";
import { Alert, Button } from "react-native";

export default function LoginScreen() {
    const authService = getAuthService();
    const { user } = useAuthGuard();

    const handleGoogleSignIn = async () => {
        try {
            await authService.signIn(AuthProviderType.GOOGLE);
            // 로그인 성공 시 authService의 onAuthStateChanged가 자동으로
            // store를 업데이트하고, useAuthGuard가 /home으로 리다이렉트함
        } catch (error: any) {
            console.error("로그인 실패:", error);
            Alert.alert(
                "로그인 실패",
                error.message || "로그인 중 오류가 발생했습니다."
            );
        }
    };

    const handleKakaoSignIn = async () => {
        try {
            await authService.signIn(AuthProviderType.KAKAO);
        } catch (error: any) {
            console.error("카카오 로그인 실패:", error);
            Alert.alert(
                "로그인 실패",
                error.message || "카카오 로그인 중 오류가 발생했습니다."
            );
        }
    };

    const googleProvider = authService.getProvider(AuthProviderType.GOOGLE);
    const GoogleSignInButtonComponent =
        googleProvider?.getSignInButton?.(handleGoogleSignIn);

    const kakaoProvider = authService.getProvider(AuthProviderType.KAKAO);

    const KakaoSignInButtonComponent =
        kakaoProvider?.getSignInButton?.(handleKakaoSignIn);

    // 이미 로그인되어 있으면 리다이렉트 중이므로 아무것도 표시하지 않음
    if (user) {
        return null;
    }

    return (
        <ScreenView style={{ justifyContent: "center", alignItems: "center" }}>
            {GoogleSignInButtonComponent ? (
                <GoogleSignInButtonComponent onPress={handleGoogleSignIn} />
            ) : (
                <Button title="Google 로그인" onPress={handleGoogleSignIn} />
            )}

            {KakaoSignInButtonComponent ? (
                <KakaoSignInButtonComponent onPress={handleKakaoSignIn} />
            ) : (
                <Button title="카카오 로그인" onPress={handleKakaoSignIn} />
            )}
        </ScreenView>
    );
}
