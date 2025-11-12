/**
 * 사용자 정보 Zustand Store
 */

import type { User } from "@/service/auth/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { middleware as expoDevToolsMiddleware } from "zustand-expo-devtools";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    user: User | null;
    isInitializing: boolean;
    setUser: (user: User | null) => void;
    clearUser: () => void;
    setInitializing: (isInitializing: boolean) => void;
}

/**
 * 사용자 정보를 관리하는 Zustand Store
 * - persist 미들웨어로 AsyncStorage에 자동 저장/복원
 * - 앱 재시작 시에도 사용자 정보 유지
 * - zustand-expo-devtools로 Expo Dev Client에서 상태 시각화 가능
 */
const useUserStoreBase = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isInitializing: true,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            setInitializing: (isInitializing) => set({ isInitializing }),
        }),
        {
            name: "user-storage", // AsyncStorage 키 이름
            storage: createJSONStorage(() => AsyncStorage),
            // user만 저장 (isInitializing은 저장하지 않음)
            partialize: (state) => ({ user: state.user }),
        }
    )
);

// Expo DevTools 미들웨어 적용
expoDevToolsMiddleware(useUserStoreBase, "userStore");

export const useUserStore = useUserStoreBase;
