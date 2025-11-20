/**
 * 인증 관련 공통 타입 정의
 */

export enum AuthProviderType {
    GOOGLE = "google",
    KAKAO = "kakao",
    APPLE = "apple",
    EMAIL = "email",
    PHONE = "phone",
}

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    provider: AuthProviderType;
    [key: string]: any;
}

export interface AuthError {
    code: string;
    message: string;
}

export interface SignInResult {
    user: User;
    credential?: any;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: AuthError | null;
}
