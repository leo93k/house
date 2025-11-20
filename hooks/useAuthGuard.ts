import { useUserStore } from "@/store";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

/**
 * 인증 가드 훅
 * 로그인되지 않은 사용자를 로그인 페이지로 리다이렉트합니다.
 */
export function useAuthGuard() {
    const { user, isInitializing } = useUserStore();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // 초기화 중이면 대기
        if (isInitializing) {
            return;
        }

        // 현재 경로가 로그인 페이지인지 확인
        const inAuthGroup = segments[0] === "auth";

        // // 로그인되지 않은 경우
        if (!user && !inAuthGroup) {
            // 로그인 페이지로 리다이렉트
            router.replace("/auth/login");
        }
        // 로그인된 경우
        else if (user && inAuthGroup) {
            // 로그인 페이지에 있으면 메인 페이지로 리다이렉트
            router.replace("/");
        }
    }, [user, isInitializing, segments, router]);
}
