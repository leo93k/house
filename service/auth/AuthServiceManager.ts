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
        // 모든 제공자에 대해 로그아웃 시도
        const logoutPromises = Array.from(this.providers.values()).map(
            (provider) => provider.signOut().catch((err) => console.error(err))
        );
        await Promise.all(logoutPromises);
    }

    /**
     * 현재 사용자 정보 가져오기
     */
    async getCurrentUser(): Promise<User | null> {
        const currentUser = getAuth().currentUser;
        if (!currentUser) {
            return null;
        }

        return {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
        };
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
                    callback({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        photoURL: firebaseUser.photoURL,
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
