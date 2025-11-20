/**
 * 인증 제공자 인터페이스
 * 각 로그인 방식(Google, Apple, Email 등)은 이 인터페이스를 구현해야 합니다.
 */

import React from "react";
import { SignInResult } from "./types";

export interface IAuthProvider {
    /**
     * 로그인 제공자 타입
     */
    readonly providerType: string;

    /**
     * 로그인 실행
     * @returns 로그인 결과 또는 에러
     */
    signIn(): Promise<SignInResult>;

    /**
     * 로그아웃 실행
     */
    signOut(): Promise<void>;

    /**
     * 현재 로그인 상태 확인
     * @returns 현재 사용자 정보 또는 null
     */
    getCurrentUser(): Promise<any | null>;

    /**
     * 로그인 버튼 컴포넌트 (선택적)
     * @param onPress 로그인 버튼 클릭 핸들러
     * @returns React 컴포넌트 또는 null
     */
    getSignInButton?(
        onPress: () => void
    ): React.ComponentType<{ onPress: () => void }> | null;
}
