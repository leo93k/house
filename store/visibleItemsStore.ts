/**
 * 보이는 매물 리스트 상태 관리 스토어 (Zustand)
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 매물 아이템 타입 (WebView에서 받는 데이터 구조에 맞춤)
export interface PropertyItem {
    itemId: number;
    lat: number;
    lng: number;
    [key: string]: unknown; // 기타 속성들
}

interface VisibleItemsState {
    items: PropertyItem[];
    count: number;
    timestamp: string | null;
    setVisibleItems: (items: PropertyItem[], count: number, timestamp: string) => void;
    clearVisibleItems: () => void;
}

export const useVisibleItemsStore = create<VisibleItemsState>()(
    devtools(
        (set) => ({
            items: [],
            count: 0,
            timestamp: null,
            setVisibleItems: (items, count, timestamp) =>
                set({ items, count, timestamp }, false, "setVisibleItems"),
            clearVisibleItems: () =>
                set(
                    { items: [], count: 0, timestamp: null },
                    false,
                    "clearVisibleItems"
                ),
        }),
        { name: "VisibleItemsStore" }
    )
);

