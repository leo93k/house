import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 거래유형: 전체, 전세, 월세
export type TransactionType = "all" | "jeonse" | "monthly";

// 구조 타입: 전체, 오픈형(방1), 분리형(방1+거실2), 복층형
export type StructureType = "all" | "open" | "separated" | "duplex";

// 층 수: 전체, 지상층, 반지하, 옥탑
export type FloorType = "all" | "ground" | "semi-basement" | "rooftop";

// 전용면적: 전체, 10평이하, 10평대, 20평대, 30평대, 40평대, 50평대, 60평 이상
export type AreaType =
    | "all"
    | "under10"
    | "10s"
    | "20s"
    | "30s"
    | "40s"
    | "50s"
    | "over60";

// 옵션: 에어컨, 냉장고, 세탁기
export type AmenityType = "aircon" | "refrigerator" | "washing";

export interface PriceRange {
    min: number;
    max: number;
}

interface FilterState {
    // 거래유형
    transactionType: TransactionType;
    // 전세인 경우: 전세금만 사용
    jeonsePrice: PriceRange; // 전세금 금액 (범위: 최소, 5천만원, 2.5억, 최대)
    // 월세인 경우: 보증금 + 월세 사용
    depositPrice: PriceRange; // 보증금 금액 (범위: 최소, 5천만원, 2.5억, 최대)
    monthlyRent: PriceRange; // 월세 금액 (범위: 최소 ~ 최대)

    // 구조 & 면적
    structureType: StructureType;
    floorType: FloorType;
    areaType: AreaType;
    parkingAvailable: boolean; // 주차가능

    // 옵션
    amenities: AmenityType[]; // 다중 선택

    // Setters
    setTransactionType: (type: TransactionType) => void;
    setJeonsePrice: (range: PriceRange) => void;
    setDepositPrice: (range: PriceRange) => void;
    setMonthlyRent: (range: PriceRange) => void;
    setStructureType: (type: StructureType) => void;
    setFloorType: (type: FloorType) => void;
    setAreaType: (type: AreaType) => void;
    setParkingAvailable: (available: boolean) => void;
    toggleAmenity: (amenity: AmenityType) => void;
    setAmenities: (amenities: AmenityType[]) => void;

    // Actions
    resetFilters: () => void;
    hasActiveFilters: () => boolean;
}

// 기본 가격 범위: 최소(0원) ~ 최대(2.5억원)
const defaultPriceRange: PriceRange = { min: 0, max: 250000000 };
// 월세 최대값: 2.5억원 (기획서에 따르면 월세도 최대 2.5억원까지 가능)
const defaultMonthlyRentRange: PriceRange = { min: 0, max: 250000000 }; // 0원 ~ 2.5억원

export const useFilterStore = create<FilterState>()(
    devtools(
        (set, get) => ({
            // 거래유형
            transactionType: "all",
            jeonsePrice: defaultPriceRange,
            depositPrice: defaultPriceRange,
            monthlyRent: defaultMonthlyRentRange,

            // 구조 & 면적
            structureType: "all",
            floorType: "all",
            areaType: "all",
            parkingAvailable: false,

            // 옵션
            amenities: [],

            // Setters
            setTransactionType: (type) =>
                set({ transactionType: type }, false, "setTransactionType"),
            setJeonsePrice: (range) =>
                set({ jeonsePrice: range }, false, "setJeonsePrice"),
            setDepositPrice: (range) =>
                set({ depositPrice: range }, false, "setDepositPrice"),
            setMonthlyRent: (range) =>
                set({ monthlyRent: range }, false, "setMonthlyRent"),
            setStructureType: (type) =>
                set({ structureType: type }, false, "setStructureType"),
            setFloorType: (type) =>
                set({ floorType: type }, false, "setFloorType"),
            setAreaType: (type) =>
                set({ areaType: type }, false, "setAreaType"),
            setParkingAvailable: (available) =>
                set({ parkingAvailable: available }, false, "setParkingAvailable"),
            toggleAmenity: (amenity) =>
                set(
                    (state) => ({
                        amenities: state.amenities.includes(amenity)
                            ? state.amenities.filter((a) => a !== amenity)
                            : [...state.amenities, amenity],
                    }),
                    false,
                    "toggleAmenity"
                ),
            setAmenities: (amenities) =>
                set({ amenities }, false, "setAmenities"),

            // Actions
            resetFilters: () =>
                set(
                    {
                        transactionType: "all",
                        jeonsePrice: defaultPriceRange,
                        depositPrice: defaultPriceRange,
                        monthlyRent: defaultMonthlyRentRange,
                        structureType: "all",
                        floorType: "all",
                        areaType: "all",
                        parkingAvailable: false,
                        amenities: [],
                    },
                    false,
                    "resetFilters"
                ),
            hasActiveFilters: () => {
                const state = get();
                return (
                    state.transactionType !== "all" ||
                    state.jeonsePrice.min !== defaultPriceRange.min ||
                    state.jeonsePrice.max !== defaultPriceRange.max ||
                    state.depositPrice.min !== defaultPriceRange.min ||
                    state.depositPrice.max !== defaultPriceRange.max ||
                    state.monthlyRent.min !== defaultMonthlyRentRange.min ||
                    state.monthlyRent.max !== defaultMonthlyRentRange.max ||
                    state.structureType !== "all" ||
                    state.floorType !== "all" ||
                    state.areaType !== "all" ||
                    state.parkingAvailable !== false ||
                    state.amenities.length > 0
                );
            },
        }),
        { name: "FilterStore" }
    )
);

