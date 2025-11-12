/**
 * 인증 가드 훅
 * 로그인 상태에 따라 자동으로 리다이렉트합니다.
 * - 로그인 되어있으면: /home으로 리다이렉트
 * - 로그인 안되어있으면: /login으로 리다이렉트
 */

import { useUserStore } from "@/store/userStore";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useRef } from "react";

export function useAuthGuard() {
    const { user, isInitializing } = useUserStore();
    const router = useRouter();
    const segments = useSegments();
    const hasRedirected = useRef(false);

    useEffect(() => {
        // 초기화 중이면 리다이렉트하지 않음
        if (isInitializing) {
            hasRedirected.current = false;
            return;
        }

        // 현재 경로 확인 (segments[0]은 첫 번째 경로 세그먼트, 없으면 루트 경로)
        const currentPath = segments[0] || "";

        if (user) {
            // 로그인 되어있으면 /home으로 리다이렉트 (이미 /home에 있으면 리다이렉트하지 않음)
            if (currentPath !== "home") {
                // 이미 리다이렉트했으면 다시 리다이렉트하지 않음 (무한 루프 방지)
                if (!hasRedirected.current) {
                    hasRedirected.current = true;
                    router.replace("/home");
                }
            } else {
                // 올바른 경로에 있으면 플래그 리셋
                hasRedirected.current = false;
            }
        } else {
            // 로그인 안되어있으면 /login으로 리다이렉트 (이미 /login에 있으면 리다이렉트하지 않음)
            if (currentPath !== "login") {
                // 이미 리다이렉트했으면 다시 리다이렉트하지 않음 (무한 루프 방지)
                if (!hasRedirected.current) {
                    hasRedirected.current = true;
                    router.replace("/login");
                }
            } else {
                // 올바른 경로에 있으면 플래그 리셋
                hasRedirected.current = false;
            }
        }
    }, [user, isInitializing, router, segments]);

    return {
        user,
        isInitializing,
        isAuthenticated: !!user,
    };
}

