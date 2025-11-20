/**
 * 인증 서비스 인스턴스 생성 및 초기화
 * 애플리케이션 전역에서 사용할 수 있는 인증 서비스 인스턴스를 제공합니다.
 */

import { useUserStore } from "@/store";
import { AuthServiceManager } from "./AuthServiceManager";
import { GoogleAuthService } from "./GoogleAuthService";
import { AUTH_CONFIG } from "./config";
import { AuthProviderType } from "./types";

// 싱글톤 인스턴스
let authServiceInstance: AuthServiceManager | null = null;

/**
 * 인증 서비스 인스턴스 가져오기
 * 첫 호출 시 인스턴스를 생성하고, 이후 호출에서는 동일한 인스턴스를 반환합니다.
 * Zustand store와 자동으로 연동되어 인증 상태 변경 시 store가 자동 업데이트됩니다.
 */
export function getAuthService(): AuthServiceManager {
    if (!authServiceInstance) {
        authServiceInstance = new AuthServiceManager();

        // Google 인증 제공자 등록
        const googleAuthService = new GoogleAuthService(
            AUTH_CONFIG.google.webClientId,
            AUTH_CONFIG.google.iosClientId
        );
        authServiceInstance.registerProvider(
            AuthProviderType.GOOGLE,
            googleAuthService
        );

        // 향후 다른 인증 제공자 추가 가능
        // const appleAuthService = new AppleAuthService(...);
        // authServiceInstance.registerProvider('apple', appleAuthService);

        // Zustand store와 자동 연동
        // 인증 상태 변경 시 자동으로 store 업데이트
        authServiceInstance.onAuthStateChanged((user) => {
            const { setUser, setInitializing, isInitializing } =
                useUserStore.getState();
            setUser(user);
            if (isInitializing) {
                setInitializing(false);
            }
        });

        // signIn 메서드를 래핑하여 로그인 후 store 업데이트
        const originalSignIn =
            authServiceInstance.signIn.bind(authServiceInstance);
        authServiceInstance.signIn = async (providerType: AuthProviderType) => {
            console.log("signIn 호출:", providerType);
            const result = await originalSignIn(providerType);
            console.log("signIn 결과:", JSON.stringify(result, null, 2));

            // 로그인 성공 시 store 업데이트는 onAuthStateChanged에서 자동 처리됨

            return result;
        };

        // signOut 메서드를 래핑하여 로그아웃 후 Zustand store 업데이트
        const originalSignOut =
            authServiceInstance.signOut.bind(authServiceInstance);
        authServiceInstance.signOut = async () => {
            console.log("signOut 호출");
            await originalSignOut();

            // 로그아웃 후 Zustand store 업데이트
            const { setUser, setInitializing, isInitializing } =
                useUserStore.getState();
            setUser(null);
            if (isInitializing) {
                setInitializing(false);
            }
            console.log("로그아웃 완료, store 업데이트됨");
        };

        // 초기 사용자 상태 확인
        authServiceInstance
            .getCurrentUser()
            .then((user) => {
                const { setUser, setInitializing, isInitializing } =
                    useUserStore.getState();
                if (user) {
                    setUser(user);
                }
                if (isInitializing) {
                    setInitializing(false);
                }
            })
            .catch((error) => {
                console.error("초기 사용자 상태 확인 실패:", error);
                // 에러가 발생해도 초기화는 완료 처리
                const { setInitializing, isInitializing } =
                    useUserStore.getState();
                if (isInitializing) {
                    setInitializing(false);
                }
            });
    }

    return authServiceInstance;
}
