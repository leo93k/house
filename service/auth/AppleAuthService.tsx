/**
 * Apple 로그인 서비스 구현 (Supabase 연동)
 */

import { supabase } from "@/util/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import React from "react";
import { Platform } from "react-native";
import { IAuthProvider } from "./AuthProvider";
import { AuthError, AuthProviderType, SignInResult } from "./types";

export class AppleAuthService implements IAuthProvider {
    readonly providerType = AuthProviderType.APPLE;

    /**
     * Apple 로그인 실행
     */
    async signIn(): Promise<SignInResult> {
        try {
            // iOS 플랫폼 확인
            if (Platform.OS !== "ios") {
                throw new Error("Apple 로그인은 iOS에서만 사용할 수 있습니다.");
            }

            // Apple 로그인 사용 가능 여부 확인
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            if (!isAvailable) {
                throw new Error(
                    "Apple 로그인을 사용할 수 없습니다. 실제 iOS 기기에서 테스트해주세요."
                );
            }

            console.log("=== Apple 로그인 시작 ===");

            // Apple 로그인 실행
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            console.log("Apple 로그인 credential 받음:", {
                user: credential.user,
                email: credential.email ? "있음" : "없음",
                fullName: credential.fullName ? "있음" : "없음",
                identityToken: credential.identityToken ? "있음" : "없음",
            });

            // Identity Token 확인
            if (!credential.identityToken) {
                throw new Error("Apple Identity Token을 가져올 수 없습니다.");
            }

            // Supabase로 로그인
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken,
            });

            if (error) {
                throw error;
            }

            if (!data.user) {
                throw new Error("사용자 정보를 가져올 수 없습니다.");
            }

            const user = this.mapSupabaseUserToUser(data.user, credential);
            user.provider = this.providerType;

            console.log("=== Apple 로그인 성공 ===");
            console.log("User:", user);

            return {
                user,
                credential: {
                    identityToken: credential.identityToken,
                    authorizationCode: credential.authorizationCode,
                    user: credential.user,
                    email: credential.email,
                    fullName: credential.fullName,
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
            // Apple 로그아웃 (iOS에서만)
            if (Platform.OS === "ios") {
                try {
                    await AppleAuthentication.signOut();
                } catch (error) {
                    console.warn("Apple 로그아웃 실패 (무시됨):", error);
                }
            }
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
     * Apple 로그인 버튼 컴포넌트 반환
     */
    getSignInButton(
        onPress: () => void
    ): React.ComponentType<{ onPress: () => void }> | null {
        if (Platform.OS !== "ios") {
            return null;
        }

        const ButtonComponent: React.FC<{ onPress: () => void }> = (props: {
            onPress: () => void;
        }) => {
            return (
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                            .SIGN_IN
                    }
                    buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                    }
                    cornerRadius={5}
                    style={{ width: 200, height: 44 }}
                    onPress={props.onPress}
                />
            );
        };
        return ButtonComponent;
    }

    /**
     * Supabase User를 User 타입으로 변환
     */
    private mapSupabaseUserToUser(
        supabaseUser: any,
        appleCredential?: AppleAuthentication.AppleAuthenticationCredential
    ): any {
        // Apple credential에서 이름 정보 가져오기
        let displayName = null;
        if (appleCredential?.fullName) {
            const fullName = appleCredential.fullName;
            if (fullName.givenName || fullName.familyName) {
                displayName = [fullName.givenName, fullName.familyName]
                    .filter(Boolean)
                    .join(" ");
            }
        }

        return {
            uid: supabaseUser.id,
            email: supabaseUser.email || appleCredential?.email || null,
            displayName:
                displayName ||
                supabaseUser.user_metadata?.full_name ||
                supabaseUser.user_metadata?.name ||
                null,
            photoURL: supabaseUser.user_metadata?.avatar_url || null,
        };
    }

    /**
     * 에러를 AuthError 타입으로 변환
     */
    private mapErrorToAuthError(error: any): AuthError {
        let message = "로그인 중 오류가 발생했습니다.";
        let code = "UNKNOWN_ERROR";

        if (error.code === "ERR_REQUEST_CANCELED") {
            code = "ERR_REQUEST_CANCELED";
            message = "로그인이 취소되었습니다.";
        } else if (error.message) {
            message = error.message;
            code = error.code || code;
        }

        return {
            code,
            message,
        };
    }
}
