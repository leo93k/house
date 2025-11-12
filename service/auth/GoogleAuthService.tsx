/**
 * Google 로그인 서비스 구현
 */

import auth from "@react-native-firebase/auth";
import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import React from "react";
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
            console.log({ response });

            if (!response.data?.idToken) {
                throw new Error("Google ID token이 없습니다.");
            }

            // Firebase Auth credential 생성
            const googleCredential = auth.GoogleAuthProvider.credential(
                response.data.idToken
            );

            // Firebase Auth로 로그인
            const userCredential = await auth().signInWithCredential(
                googleCredential
            );

            const user = this.mapFirebaseUserToUser(userCredential.user);
            user.provider = this.providerType;
            return {
                user,
                credential: googleCredential,
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
            // Firebase Auth 로그아웃
            await auth().signOut();
        } catch (error: any) {
            const authError = this.mapErrorToAuthError(error);
            throw authError;
        }
    }

    /**
     * 현재 로그인된 사용자 정보 가져오기
     */
    async getCurrentUser(): Promise<any | null> {
        const currentUser = auth().currentUser;
        return currentUser ? this.mapFirebaseUserToUser(currentUser) : null;
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
     * Firebase User를 User 타입으로 변환
     */
    private mapFirebaseUserToUser(firebaseUser: any): any {
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
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
