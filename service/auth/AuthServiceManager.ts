/**
 * 인증 서비스 관리자
 * 여러 인증 제공자를 관리하고 통합 인터페이스를 제공합니다.
 */

import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { IAuthProvider } from "./AuthProvider";
import { AuthProviderType, User } from "./types";

export class AuthServiceManager {
    private providers: Map<AuthProviderType, IAuthProvider> = new Map();
    private authStateListeners: (() => void)[] = [];

    /**
     * 인증 제공자 등록
     */
    registerProvider(providerType: AuthProviderType, provider: IAuthProvider) {
        this.providers.set(providerType, provider);
    }

    /**
     * 특정 타입의 인증 제공자 가져오기
     */
    getProvider(providerType: AuthProviderType): IAuthProvider | undefined {
        return this.providers.get(providerType);
    }

    /**
     * 특정 제공자로 로그인
     */
    async signIn(providerType: AuthProviderType) {
        const provider = this.getProvider(providerType);
        if (!provider) {
            throw new Error(`${providerType} 제공자를 찾을 수 없습니다.`);
        }
        return await provider.signIn();
    }

    /**
     * 로그아웃
     */
    async signOut() {
        // 현재 로그인된 사용자의 provider 확인
        const currentUser = await this.getCurrentUser();

        if (currentUser && currentUser.provider) {
            // 현재 로그인된 provider만 로그아웃
            const provider = this.getProvider(currentUser.provider);
            if (provider) {
                try {
                    await provider.signOut();
                } catch (err) {
                    // 로그아웃 실패는 무시 (이미 로그아웃된 상태일 수 있음)
                    console.log(
                        `로그아웃 실패 (${currentUser.provider}):`,
                        err
                    );
                }
            }
        } else {
            // provider 정보가 없으면 모든 제공자에 대해 로그아웃 시도 (fallback)
            const logoutPromises = Array.from(this.providers.values()).map(
                async (provider) => {
                    try {
                        await provider.signOut();
                    } catch (err) {
                        // 로그아웃 실패는 무시 (이미 로그아웃된 상태일 수 있음)
                        console.log(
                            `로그아웃 실패 (${provider.providerType}):`,
                            err
                        );
                    }
                }
            );
            await Promise.all(logoutPromises);
        }
    }

    /**
     * 현재 사용자 정보 가져오기
     */
    async getCurrentUser(): Promise<User | null> {
        // Firebase Auth에서 먼저 확인
        const currentUser = getAuth().currentUser;
        if (currentUser) {
            // Firebase Auth의 provider 정보 확인
            const providerId =
                currentUser.providerData?.[0]?.providerId || "google";
            const providerType =
                providerId === "google.com"
                    ? AuthProviderType.GOOGLE
                    : providerId === "apple.com"
                    ? AuthProviderType.APPLE
                    : AuthProviderType.GOOGLE; // 기본값

            return {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                provider: providerType,
            };
        }

        // Firebase Auth에 사용자가 없으면 카카오 등 다른 제공자 확인
        // 카카오 제공자가 있으면 getCurrentUser 호출
        const kakaoProvider = this.getProvider(AuthProviderType.KAKAO);
        if (kakaoProvider) {
            try {
                const kakaoUser = await kakaoProvider.getCurrentUser();
                if (kakaoUser) {
                    return kakaoUser;
                }
            } catch {
                // 카카오 사용자 확인 실패는 무시 (로그인 안된 상태)
            }
        }

        return null;
    }

    /**
     * 인증 상태 변경 리스너 등록
     * @param callback 인증 상태 변경 시 호출될 콜백
     * @returns unsubscribe 함수
     */
    onAuthStateChanged(callback: (user: User | null) => void): () => void {
        const unsubscribe = onAuthStateChanged(
            getAuth(),
            (firebaseUser: any) => {
                if (firebaseUser) {
                    // Firebase Auth의 provider 정보 확인
                    const providerId =
                        firebaseUser.providerData?.[0]?.providerId || "google";
                    const providerType =
                        providerId === "google.com"
                            ? AuthProviderType.GOOGLE
                            : providerId === "apple.com"
                            ? AuthProviderType.APPLE
                            : AuthProviderType.GOOGLE; // 기본값

                    callback({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        photoURL: firebaseUser.photoURL,
                        provider: providerType,
                    });
                } else {
                    callback(null);
                }
            }
        );

        this.authStateListeners.push(unsubscribe);
        return unsubscribe;
    }

    /**
     * 등록된 모든 리스너 해제
     */
    removeAllListeners() {
        this.authStateListeners.forEach((unsubscribe) => unsubscribe());
        this.authStateListeners = [];
    }
}
