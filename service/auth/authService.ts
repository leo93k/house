/**
 * 인증 서비스 인스턴스 생성 및 초기화
 * 애플리케이션 전역에서 사용할 수 있는 인증 서비스 인스턴스를 제공합니다.
 */

import { AuthServiceManager } from "./AuthServiceManager";
import { GoogleAuthService } from "./GoogleAuthService";
import { AUTH_CONFIG } from "./config";
import { AuthProviderType } from "./types";

// 싱글톤 인스턴스
let authServiceInstance: AuthServiceManager | null = null;

/**
 * 인증 서비스 인스턴스 가져오기
 * 첫 호출 시 인스턴스를 생성하고, 이후 호출에서는 동일한 인스턴스를 반환합니다.
 */
export function getAuthService(): AuthServiceManager {
    if (!authServiceInstance) {
        authServiceInstance = new AuthServiceManager();

        // Google 인증 제공자 등록
        const googleAuthService = new GoogleAuthService(
            AUTH_CONFIG.google.webClientId
        );
        authServiceInstance.registerProvider(
            AuthProviderType.GOOGLE,
            googleAuthService
        );

        // 향후 다른 인증 제공자 추가 가능
        // const appleAuthService = new AppleAuthService(...);
        // authServiceInstance.registerProvider('apple', appleAuthService);
    }

    return authServiceInstance;
}
