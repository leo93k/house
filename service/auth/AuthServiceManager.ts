/**
 * 인증 서비스 관리자
 * 여러 인증 제공자를 관리하고 통합 인터페이스를 제공합니다.
 */

import { supabase } from "@/util/supabase";
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
        // Supabase에서 세션 확인
        const { supabase } = await import("@/util/supabase");
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
            return null;
        }

        // 세션의 user_metadata에서 provider 정보 확인
        const providerType =
            session.user.app_metadata?.provider ||
            session.user.user_metadata?.provider ||
            AuthProviderType.GOOGLE; // 기본값

        return {
            uid: session.user.id,
            email: session.user.email || null,
            displayName:
                session.user.user_metadata?.full_name ||
                session.user.user_metadata?.name ||
                null,
            photoURL:
                session.user.user_metadata?.avatar_url ||
                session.user.user_metadata?.picture ||
                null,
            provider: providerType as AuthProviderType,
        };
    }

    /**
     * 인증 상태 변경 리스너 등록
     * @param callback 인증 상태 변경 시 호출될 콜백
     * @returns unsubscribe 함수
     */
    onAuthStateChanged(callback: (user: User | null) => void): () => void {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                const providerType =
                    session.user.app_metadata?.provider ||
                    session.user.user_metadata?.provider ||
                    AuthProviderType.GOOGLE;

                const user: User = {
                    uid: session.user.id,
                    email: session.user.email || null,
                    displayName:
                        session.user.user_metadata?.full_name ||
                        session.user.user_metadata?.name ||
                        null,
                    photoURL:
                        session.user.user_metadata?.avatar_url ||
                        session.user.user_metadata?.picture ||
                        null,
                    provider: providerType as AuthProviderType,
                };
                callback(user);
            } else {
                callback(null);
            }
        });

        const unsubscribe = () => {
            subscription.unsubscribe();
        };

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
