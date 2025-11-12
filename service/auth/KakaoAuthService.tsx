/**
 * 카카오톡 로그인 서비스 구현
 */

import auth from "@react-native-firebase/auth";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { getAccessToken, login, logout, me } from "@react-native-kakao/user";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { IAuthProvider } from "./AuthProvider";
import { AuthError, AuthProviderType, SignInResult } from "./types";

export class KakaoAuthService implements IAuthProvider {
    readonly providerType = AuthProviderType.KAKAO;
    private nativeAppKey: string;
    private isInitialized: boolean = false;

    constructor(nativeAppKey: string) {
        this.nativeAppKey = nativeAppKey;
        this.initialize();
    }

    /**
     * 카카오 SDK 초기화
     */
    private initialize() {
        if (this.isInitialized) {
            return;
        }

        try {
            initializeKakaoSDK(this.nativeAppKey);
            this.isInitialized = true;
        } catch (error) {
            console.error("카카오 SDK 초기화 실패:", error);
        }
    }

    /**
     * 카카오 로그인 실행
     */
    async signIn(): Promise<SignInResult> {
        try {
            // SDK 초기화 확인
            if (!this.isInitialized) {
                this.initialize();
            }

            // 카카오 로그인 실행
            const res = await login();
            console.log({ res });

            // Access Token 가져오기
            const accessToken = await getAccessToken();

            if (!accessToken) {
                throw new Error("카카오 Access Token을 가져올 수 없습니다.");
            }

            // me() 함수로 사용자 정보 가져오기
            const kakaoUser = await me();
            console.log("kakaoUser", kakaoUser);

            if (!kakaoUser) {
                throw new Error("카카오 사용자 정보를 가져올 수 없습니다.");
            }

            const user = this.mapKakaoUserToUser(kakaoUser);
            console.log({ user });

            return {
                user,
                credential: {
                    provider: "kakao",
                    accessToken,
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
            // Access Token이 있는지 확인 (로그인 상태 확인)
            const accessToken = await getAccessToken();
            if (accessToken) {
                // 카카오 로그아웃
                await logout();
            }
        } catch {
            // Access Token이 없거나 이미 로그아웃된 상태
            // 무시하고 계속 진행 (이미 로그아웃된 상태일 수 있음)
            console.log(
                "카카오 로그아웃: 이미 로그아웃된 상태이거나 로그인하지 않음"
            );
        }
    }

    /**
     * 현재 로그인된 사용자 정보 가져오기
     */
    async getCurrentUser(): Promise<any | null> {
        try {
            // Firebase Auth에서 현재 사용자 확인
            const firebaseUser = auth().currentUser;
            if (firebaseUser) {
                return this.mapFirebaseUserToUser(firebaseUser);
            }

            // 카카오 Access Token이 있으면 카카오 사용자 정보 반환
            try {
                const accessToken = await getAccessToken();
                if (accessToken) {
                    // me() 함수로 사용자 정보 가져오기
                    const kakaoUser = await me();
                    if (kakaoUser) {
                        return this.mapKakaoUserToUser(kakaoUser);
                    }
                }
            } catch {
                // Access Token이 없거나 로그인 안된 상태
                return null;
            }

            return null;
        } catch (error) {
            console.error("현재 사용자 확인 실패:", error);
            return null;
        }
    }

    /**
     * 카카오 로그인 버튼 컴포넌트 반환
     */
    getSignInButton(
        onPress: () => void
    ): React.ComponentType<{ onPress: () => void }> | null {
        const ButtonComponent: React.FC<{ onPress: () => void }> = (props: {
            onPress: () => void;
        }) => {
            return (
                <View style={styles.buttonContainer}>
                    <Button
                        title="카카오 로그인"
                        onPress={props.onPress}
                        color="#FEE500"
                    />
                </View>
            );
        };
        return ButtonComponent;
    }

    /**
     * 카카오 사용자 정보를 User 타입으로 변환
     * KakaoUser 타입: { id, email, name, nickname, profileImageUrl, ... }
     */
    private mapKakaoUserToUser(kakaoUser: any): any {
        return {
            uid: kakaoUser.id?.toString() || "",
            email: kakaoUser.email || null,
            displayName: kakaoUser.nickname || kakaoUser.name || null,
            photoURL:
                kakaoUser.profileImageUrl ||
                kakaoUser.thumbnailImageUrl ||
                null,
            provider: this.providerType,
            // 추가 정보도 포함
            phoneNumber: kakaoUser.phoneNumber || null,
            ageRange: kakaoUser.ageRange || null,
            gender: kakaoUser.gender || null,
        };
    }

    /**
     * Firebase User를 User 타입으로 변환
     */
    private mapFirebaseUserToUser(firebaseUser: any): any {
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: this.providerType,
        };
    }

    /**
     * 에러를 AuthError 타입으로 변환
     */
    private mapErrorToAuthError(error: any): AuthError {
        let message = "로그인 중 오류가 발생했습니다.";

        // 카카오 에러 코드 처리
        if (error.code) {
            switch (error.code) {
                case "CANCELLED":
                case "USER_CANCELLED":
                    message = "로그인이 취소되었습니다.";
                    break;
                case "NOT_INSTALLED":
                    message = "카카오톡이 설치되어 있지 않습니다.";
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

const styles = StyleSheet.create({
    buttonContainer: {
        width: 200,
        height: 44,
        marginVertical: 8,
    },
});
