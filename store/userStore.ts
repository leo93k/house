/**
 * 사용자 인증 상태 관리 스토어 (Zustand)
 */

import { User } from "@/service/auth/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
    user: User | null;
    isInitializing: boolean;
    setUser: (user: User | null) => void;
    setInitializing: (isInitializing: boolean) => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set) => ({
            user: null,
            isInitializing: true,
            setUser: (user) => set({ user }, false, "setUser"),
            setInitializing: (isInitializing) =>
                set({ isInitializing }, false, "setInitializing"),
        }),
        { name: "UserStore" }
    )
);
