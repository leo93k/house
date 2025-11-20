import { supabase } from "@/util/supabase";
import {
    GoogleSignin,
    GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        // 초기 session 가져오기
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        // auth state 변경 감지
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        // Google Sign-In 초기화
        GoogleSignin.configure({
            // Google Cloud Console에서 발급받은 웹 클라이언트 ID를 입력하세요
            // OAuth 2.0 클라이언트 ID (웹 애플리케이션 타입)
            webClientId:
                "945586864109-kop84vthb926olsq7f9tjq7h0jsv412s.apps.googleusercontent.com",
            scopes: [],
        });
    }, []);

    const onSignin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("User Info:", userInfo);

            const tokens = await GoogleSignin.getTokens();
            if (tokens.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: "google",
                    token: tokens.idToken,
                });
                if (error) {
                    console.error("Supabase sign in error:", error);
                } else {
                    console.log("Sign in successful:", data);
                }
            }
        } catch (error) {
            console.error("Google sign in error:", error);
        }
    };

    const onSignOut = async () => {
        try {
            await GoogleSignin.signOut();
            await supabase.auth.signOut();
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
                    {session ? (
                        <Button title="Sign Out" onPress={onSignOut} />
                    ) : (
                        <GoogleSigninButton
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={onSignin}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
