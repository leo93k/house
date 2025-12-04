import {
    useFilterStore,
    type AmenityType,
    type AreaType,
    type FloorType,
    type StructureType,
    type TransactionType,
} from "@/store/filterStore";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
    Animated,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { PriceRangeSlider } from "./PriceRangeSlider";

interface FilterFormData {
    transactionType: TransactionType;
    jeonsePrice: { min: number; max: number };
    depositPrice: { min: number; max: number };
    monthlyRent: { min: number; max: number };
    structureType: StructureType;
    floorType: FloorType;
    areaType: AreaType;
    parkingAvailable: boolean;
    amenities: AmenityType[];
}

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    filterType: "transaction" | "structure" | "option" | null;
}

export function FilterModal({
    visible,
    onClose,
    filterType,
}: FilterModalProps) {
    const {
        transactionType,
        jeonsePrice,
        depositPrice,
        monthlyRent,
        structureType,
        floorType,
        areaType,
        parkingAvailable,
        amenities,
        setTransactionType,
        setJeonsePrice,
        setDepositPrice,
        setMonthlyRent,
        setStructureType,
        setFloorType,
        setAreaType,
        setParkingAvailable,
        setAmenities,
    } = useFilterStore();

    // react-hook-form 설정
    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { isDirty },
    } = useForm<FilterFormData>({
        defaultValues: {
            transactionType,
            jeonsePrice,
            depositPrice,
            monthlyRent,
            structureType,
            floorType,
            areaType,
            parkingAvailable,
            amenities: [...amenities],
        },
    });

    // watch로 현재 폼 값 감시
    const formValues = watch();

    // 모달 애니메이션
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    // 모달이 열릴 때마다 현재 상태로 폼 초기화 및 애니메이션
    useEffect(() => {
        if (visible) {
            reset({
                transactionType,
                jeonsePrice,
                depositPrice,
                monthlyRent,
                structureType,
                floorType,
                areaType,
                parkingAvailable,
                amenities: [...amenities],
            });

            // 애니메이션 시작
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 1,
                    tension: 65,
                    friction: 11,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // 모달이 닫힐 때 애니메이션 리셋
            slideAnim.setValue(0);
            opacityAnim.setValue(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    // 폼 제출 핸들러
    const onSubmit = (data: FilterFormData) => {
        setTransactionType(data.transactionType);
        setJeonsePrice(data.jeonsePrice);
        setDepositPrice(data.depositPrice);
        setMonthlyRent(data.monthlyRent);
        setStructureType(data.structureType);
        setFloorType(data.floorType);
        setAreaType(data.areaType);
        setParkingAvailable(data.parkingAvailable);
        setAmenities(data.amenities);
        onClose();
    };

    // 초기값으로 되돌리기 (모달 내에서만)
    const handleResetToInitial = () => {
        reset({
            transactionType,
            jeonsePrice,
            depositPrice,
            monthlyRent,
            structureType,
            floorType,
            areaType,
            parkingAvailable,
            amenities: [...amenities],
        });
    };

    const formatPrice = (value: number) => {
        if (value >= 100000000) {
            return `${(value / 100000000).toFixed(1)}억원`;
        }
        if (value >= 10000) {
            return `${(value / 10000).toFixed(0)}만원`;
        }
        return `${value.toLocaleString()}원`;
    };

    // 거래유형 섹션
    const renderTransactionSection = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>거래유형</Text>
            <View style={styles.buttonRow}>
                {(["all", "jeonse", "monthly"] as TransactionType[]).map(
                    (type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.typeButton,
                                formValues.transactionType === type &&
                                    styles.typeButtonActive,
                            ]}
                            onPress={() => setValue("transactionType", type)}
                        >
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    formValues.transactionType === type &&
                                        styles.typeButtonTextActive,
                                ]}
                            >
                                {type === "all"
                                    ? "전체"
                                    : type === "jeonse"
                                    ? "전세"
                                    : "월세"}
                            </Text>
                        </TouchableOpacity>
                    )
                )}
            </View>
            {/* 전세인 경우: 전세금만 표시 */}
            {formValues.transactionType === "jeonse" && (
                <View style={styles.priceRangeContainer}>
                    <Text style={styles.sectionSubtitle}>전세금</Text>
                    <PriceRangeSlider
                        title="전세금"
                        value={formValues.jeonsePrice}
                        onChange={(range) => setValue("jeonsePrice", range)}
                        min={0}
                        max={250000000} // 2.5억원
                        step={1000000} // 100만원 단위
                        formatValue={formatPrice}
                        markers={[
                            { value: 50000000, label: "5천만" },
                            { value: 250000000, label: "2.5억" },
                        ]}
                    />
                </View>
            )}

            {/* 월세 또는 전체인 경우: 보증금 + 월세 표시 */}
            {(formValues.transactionType === "monthly" ||
                formValues.transactionType === "all") && (
                <>
                    <View style={styles.priceRangeContainer}>
                        <Text style={styles.sectionSubtitle}>보증금</Text>
                        <PriceRangeSlider
                            title="보증금"
                            value={formValues.depositPrice}
                            onChange={(range) =>
                                setValue("depositPrice", range)
                            }
                            min={0}
                            max={250000000} // 2.5억원
                            step={1000000} // 100만원 단위
                            formatValue={formatPrice}
                            markers={[
                                { value: 50000000, label: "5천만" },
                                { value: 250000000, label: "2.5억" },
                            ]}
                        />
                    </View>
                    <View style={styles.priceRangeContainer}>
                        <Text style={styles.sectionSubtitle}>월세</Text>
                        <PriceRangeSlider
                            title="월세"
                            value={formValues.monthlyRent}
                            onChange={(range) => setValue("monthlyRent", range)}
                            min={0}
                            max={250000000} // 2.5억원
                            step={1000000} // 100만원 단위
                            formatValue={formatPrice}
                            markers={[
                                { value: 50000000, label: "5천만" },
                                { value: 250000000, label: "2.5억" },
                            ]}
                        />
                    </View>
                </>
            )}
        </View>
    );

    // 구조 & 면적 섹션
    const renderStructureSection = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>구조 & 면적</Text>

            {/* 구조 타입 */}
            <Text style={styles.sectionSubtitle}>구조 타입</Text>
            <View style={styles.buttonRow}>
                {(
                    ["all", "open", "separated", "duplex"] as StructureType[]
                ).map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.typeButton,
                            formValues.structureType === type &&
                                styles.typeButtonActive,
                        ]}
                        onPress={() => setValue("structureType", type)}
                    >
                        <Text
                            style={[
                                styles.typeButtonText,
                                formValues.structureType === type &&
                                    styles.typeButtonTextActive,
                            ]}
                        >
                            {type === "all"
                                ? "전체"
                                : type === "open"
                                ? "오픈형(방1)"
                                : type === "separated"
                                ? "분리형(방1+거실2)"
                                : "복층형"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 층 수 */}
            <Text style={styles.sectionSubtitle}>층 수</Text>
            <View style={styles.buttonRow}>
                {(
                    ["all", "ground", "semi-basement", "rooftop"] as FloorType[]
                ).map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.typeButton,
                            formValues.floorType === type &&
                                styles.typeButtonActive,
                        ]}
                        onPress={() => setValue("floorType", type)}
                    >
                        <Text
                            style={[
                                styles.typeButtonText,
                                formValues.floorType === type &&
                                    styles.typeButtonTextActive,
                            ]}
                        >
                            {type === "all"
                                ? "전체"
                                : type === "ground"
                                ? "지상층"
                                : type === "semi-basement"
                                ? "반지하"
                                : "옥탑"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 전용면적 */}
            <Text style={styles.sectionSubtitle}>전용면적</Text>
            <View style={styles.buttonRow}>
                {(
                    [
                        "all",
                        "under10",
                        "10s",
                        "20s",
                        "30s",
                        "40s",
                        "50s",
                        "over60",
                    ] as AreaType[]
                ).map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.typeButton,
                            formValues.areaType === type &&
                                styles.typeButtonActive,
                        ]}
                        onPress={() => setValue("areaType", type)}
                    >
                        <Text
                            style={[
                                styles.typeButtonText,
                                formValues.areaType === type &&
                                    styles.typeButtonTextActive,
                            ]}
                        >
                            {type === "all"
                                ? "전체"
                                : type === "under10"
                                ? "10평이하"
                                : type === "10s"
                                ? "10평대"
                                : type === "20s"
                                ? "20평대"
                                : type === "30s"
                                ? "30평대"
                                : type === "40s"
                                ? "40평대"
                                : type === "50s"
                                ? "50평대"
                                : "60평 이상"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 주차가능 */}
            <View style={styles.switchContainer}>
                <Text style={styles.sectionSubtitle}>주차가능</Text>
                <Switch
                    value={formValues.parkingAvailable}
                    onValueChange={(value) =>
                        setValue("parkingAvailable", value)
                    }
                    trackColor={{ false: "#e0e0e0", true: "#90caf9" }}
                    thumbColor={
                        formValues.parkingAvailable ? "#1976d2" : "#f4f3f4"
                    }
                />
            </View>
        </View>
    );

    // 옵션 섹션
    const renderOptionSection = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>옵션</Text>
            <View style={styles.optionContainer}>
                {(["aircon", "refrigerator", "washing"] as AmenityType[]).map(
                    (amenity) => (
                        <TouchableOpacity
                            key={amenity}
                            style={[
                                styles.optionButton,
                                formValues.amenities?.includes(amenity) &&
                                    styles.optionButtonActive,
                            ]}
                            onPress={() => {
                                const currentAmenities =
                                    formValues.amenities || [];
                                const newAmenities = currentAmenities.includes(
                                    amenity
                                )
                                    ? currentAmenities.filter(
                                          (a) => a !== amenity
                                      )
                                    : [...currentAmenities, amenity];
                                setValue("amenities", newAmenities);
                            }}
                        >
                            <Text
                                style={[
                                    styles.optionButtonText,
                                    formValues.amenities?.includes(amenity) &&
                                        styles.optionButtonTextActive,
                                ]}
                            >
                                {amenity === "aircon"
                                    ? "에어컨"
                                    : amenity === "refrigerator"
                                    ? "냉장고"
                                    : "세탁기"}
                            </Text>
                        </TouchableOpacity>
                    )
                )}
            </View>
        </View>
    );

    // 모달 컨텐츠 슬라이드 애니메이션 (아래에서 위로)
    const translateY = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0], // 아래에서 위로 슬라이드
    });

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Animated.View
                style={[
                    styles.overlay,
                    {
                        opacity: opacityAnim,
                    },
                ]}
            >
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{ translateY }],
                        },
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Filters</Text>
                    </View>

                    <ScrollView
                        style={styles.content}
                        contentContainerStyle={styles.contentContainer}
                    >
                        {filterType === "transaction" &&
                            renderTransactionSection()}
                        {filterType === "structure" && renderStructureSection()}
                        {filterType === "option" && renderOptionSection()}
                        {filterType === null && (
                            <>
                                {renderTransactionSection()}
                                {renderStructureSection()}
                                {renderOptionSection()}
                            </>
                        )}
                    </ScrollView>

                    <View style={styles.footer}>
                        {isDirty && (
                            <TouchableOpacity
                                style={styles.resetButton}
                                onPress={handleResetToInitial}
                            >
                                <Text style={styles.resetButtonText}>
                                    ↺ 초기화
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={[
                                styles.applyButton,
                                !isDirty && styles.applyButtonFullWidth,
                            ]}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.applyButtonText}>적용하기</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "80%",
        minHeight: "50%",
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 12,
    },
    sectionSubtitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
        marginTop: 16,
        marginBottom: 8,
    },
    priceRangeContainer: {
        marginTop: 12,
    },
    buttonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    typeButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        marginRight: 8,
        marginBottom: 8,
    },
    typeButtonActive: {
        backgroundColor: "#1976d2",
    },
    typeButtonText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    typeButtonTextActive: {
        color: "#fff",
    },
    footer: {
        flexDirection: "row",
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        gap: 12,
    },
    resetButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    applyButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: "#1976d2",
        alignItems: "center",
        justifyContent: "center",
    },
    applyButtonFullWidth: {
        flex: 1,
        width: "100%",
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        paddingVertical: 8,
    },
    optionContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    optionButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    optionButtonActive: {
        backgroundColor: "#e3f2fd",
        borderColor: "#1976d2",
    },
    optionButtonText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    optionButtonTextActive: {
        color: "#1976d2",
    },
});
