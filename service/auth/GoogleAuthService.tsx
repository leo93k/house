/**
 * Google 로그인 서비스 구현 (Supabase 연동)
 */

import { supabase } from "@/util/supabase";
import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { Platform } from "react-native";
import { IAuthProvider } from "./AuthProvider";
import { AuthError, AuthProviderType, SignInResult } from "./types";

export class GoogleAuthService implements IAuthProvider {
    readonly providerType = AuthProviderType.GOOGLE;
    private webClientId: string;
    private iosClientId: string;

    constructor(webClientId: string, iosClientId: string) {
        this.webClientId = webClientId || "";
        this.iosClientId = iosClientId || "";
        this.initialize();
    }

    /**
     * Google Sign-In 초기화
     */
    private initialize() {
        if (!this.webClientId || this.webClientId.trim() === "") {
            console.error(
                "Google Sign-In을 초기화할 수 없습니다: webClientId가 없습니다. EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB 환경 변수를 확인해주세요."
            );
            return;
        }

        const config: any = {
            webClientId: this.webClientId,
            offlineAccess: false, // ID 토큰만 필요하므로 offline access는 비활성화
        };

        // 디버깅을 위한 상세 로그
        console.log("=== Google Sign-In 초기화 디버깅 ===");
        console.log("Platform:", Platform.OS);
        console.log("webClientId:", {
            value: this.webClientId,
            length: this.webClientId?.length || 0,
            isEmpty: !this.webClientId || this.webClientId.trim() === "",
        });
        console.log("iosClientId:", {
            value: this.iosClientId,
            length: this.iosClientId?.length || 0,
            isEmpty: !this.iosClientId || this.iosClientId.trim() === "",
        });
        console.log("Environment variables:", {
            EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB:
                process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB || "not set",
            EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS:
                process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS || "not set",
        });
        console.log("===================================");

        // iOS에서는 iosClientId가 필수
        if (Platform.OS === "ios") {
            if (!this.iosClientId || this.iosClientId.trim() === "") {
                console.error(
                    "Google Sign-In을 초기화할 수 없습니다: iOS에서는 iosClientId가 필수입니다. EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS 환경 변수를 확인해주세요."
                );
                return;
            }
            config.iosClientId = this.iosClientId;
            console.log(
                "Google Sign-In 초기화 완료 (webClientId, iosClientId 설정됨)"
            );
        } else {
            // Android에서는 선택적
            if (this.iosClientId && this.iosClientId.trim() !== "") {
                config.iosClientId = this.iosClientId;
                console.log(
                    "Google Sign-In 초기화 완료 (webClientId, iosClientId 설정됨)"
                );
            } else {
                console.log(
                    "Google Sign-In 초기화 완료 (webClientId 설정됨, iosClientId 없음 - Android에서는 선택적)"
                );
            }
        }

        GoogleSignin.configure(config);
    }

    /**
     * Google 로그인 실행
     */
    async signIn(): Promise<SignInResult> {
        try {
            // webClientId 확인
            if (!this.webClientId || this.webClientId.trim() === "") {
                throw new Error(
                    "Google webClientId가 설정되지 않았습니다. " +
                        "EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB 환경 변수를 확인하고, " +
                        "Google Cloud Console에서 OAuth 2.0 클라이언트 ID (웹 애플리케이션)를 설정해주세요."
                );
            }

            // Google Play Services 확인 (Android)
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });

            // Google 로그인 실행
            const response = await GoogleSignin.signIn();
            console.log("Google Sign-In response:", response);

            // ID Token 가져오기
            // getTokens()를 호출하여 ID 토큰 가져오기
            let idToken: string | null = null;

            try {
                const tokens = await GoogleSignin.getTokens();
                idToken = tokens.idToken || null;
                console.log("Google tokens retrieved:", {
                    hasIdToken: !!idToken,
                    hasAccessToken: !!tokens.accessToken,
                });
            } catch (tokenError: any) {
                console.error("Failed to get Google tokens:", tokenError);
                throw new Error(
                    `ID 토큰을 가져올 수 없습니다: ${
                        tokenError.message || "알 수 없는 오류"
                    }`
                );
            }

            if (!idToken) {
                console.error(
                    "Google Sign-In response:",
                    JSON.stringify(response, null, 2)
                );
                console.error(
                    "webClientId:",
                    this.webClientId ? "설정됨" : "설정되지 않음"
                );
                throw new Error(
                    "Google ID token이 없습니다. " +
                        "webClientId가 올바르게 설정되었는지 확인해주세요. " +
                        "Google Cloud Console에서 OAuth 2.0 클라이언트 ID (웹 애플리케이션)를 확인하세요."
                );
            }

            // Supabase로 로그인
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: idToken,
            });

            if (error) {
                throw error;
            }

            if (!data.user) {
                throw new Error("사용자 정보를 가져올 수 없습니다.");
            }

            const user = this.mapSupabaseUserToUser(data.user);
            user.provider = this.providerType;
            return {
                user,
                credential: {
                    idToken,
                    accessToken:
                        (await GoogleSignin.getTokens()).accessToken || null,
                },
            };
        } catch (error: any) {
            const authError = this.mapErrorToAuthError(error);
            throw authError;
        }
    }

    /**
     * 로그아웃 실행
     */
    async signOut(): Promise<void> {
        try {
            // Google Sign-In 로그아웃
            await GoogleSignin.signOut();
            // Supabase 로그아웃
            await supabase.auth.signOut();
        } catch (error: any) {
            const authError = this.mapErrorToAuthError(error);
            throw authError;
        }
    }

    /**
     * 현재 로그인된 사용자 정보 가져오기
     */
    async getCurrentUser(): Promise<any | null> {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        return session?.user ? this.mapSupabaseUserToUser(session.user) : null;
    }

    /**
     * Google 로그인 버튼 컴포넌트 반환
     */
    getSignInButton(
        onPress: () => void
    ): React.ComponentType<{ onPress: () => void }> | null {
        const ButtonComponent: React.FC<{ onPress: () => void }> = (props: {
            onPress: () => void;
        }) => {
            return (
                <GoogleSigninButton
                    onPress={props.onPress}
                    color={GoogleSigninButton.Color.Dark}
                />
            );
        };
        return ButtonComponent;
    }

    /**
     * Supabase User를 User 타입으로 변환
     */
    private mapSupabaseUserToUser(supabaseUser: any): any {
        return {
            uid: supabaseUser.id,
            email: supabaseUser.email,
            displayName:
                supabaseUser.user_metadata?.full_name ||
                supabaseUser.user_metadata?.name ||
                null,
            photoURL:
                supabaseUser.user_metadata?.avatar_url ||
                supabaseUser.user_metadata?.picture ||
                null,
        };
    }

    /**
     * 에러를 AuthError 타입으로 변환
     */
    private mapErrorToAuthError(error: any): AuthError {
        if (isErrorWithCode(error)) {
            let message = "로그인 중 오류가 발생했습니다.";

            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    message = "로그인이 취소되었습니다.";
                    break;
                case statusCodes.IN_PROGRESS:
                    message = "로그인 진행 중입니다.";
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    message =
                        "Google Play Services를 사용할 수 없습니다. (Android)";
                    break;
                default:
                    message = error.message || message;
            }

            return {
                code: error.code,
                message,
            };
        }

        return {
            code: error.code || "UNKNOWN_ERROR",
            message: error.message || "알 수 없는 오류가 발생했습니다.",
        };
    }
}
