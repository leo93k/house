/**
 * Google 로그인 서비스 구현 (Supabase 연동)
 */

import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { supabase } from "@/util/supabase";
import { IAuthProvider } from "./AuthProvider";
import { AuthError, AuthProviderType, SignInResult } from "./types";

export class GoogleAuthService implements IAuthProvider {
    readonly providerType = AuthProviderType.GOOGLE;
    private webClientId: string;

    constructor(webClientId: string) {
        this.webClientId = webClientId;
        this.initialize();
    }

    /**
     * Google Sign-In 초기화
     */
    private initialize() {
        GoogleSignin.configure({
            webClientId: this.webClientId,
        });
    }

    /**
     * Google 로그인 실행
     */
    async signIn(): Promise<SignInResult> {
        try {
            // Google Play Services 확인 (Android)
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });

            // Google 로그인 실행
            const response = await GoogleSignin.signIn();
            console.log("Google Sign-In response:", response);

            // ID Token 가져오기
            const tokens = await GoogleSignin.getTokens();
            if (!tokens.idToken) {
                throw new Error("Google ID token이 없습니다.");
            }

            // Supabase로 로그인
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: tokens.idToken,
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
                credential: tokens,
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
        return session?.user
            ? this.mapSupabaseUserToUser(session.user)
            : null;
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
            displayName: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || null,
            photoURL: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || null,
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
