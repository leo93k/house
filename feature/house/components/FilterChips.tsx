import { useFilterStore } from "@/store/filterStore";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface FilterChipsProps {
    onTransactionPress: () => void;
    onStructurePress: () => void;
    onOptionPress: () => void;
    onResetPress: () => void;
}

export function FilterChips({
    onTransactionPress,
    onStructurePress,
    onOptionPress,
    onResetPress,
}: FilterChipsProps) {
    const {
        transactionType,
        structureType,
        floorType,
        areaType,
        parkingAvailable,
        amenities,
        hasActiveFilters,
    } = useFilterStore();

    // 거래유형 칩에 표시할 텍스트
    const getTransactionText = () => {
        if (transactionType === "jeonse") return "전세";
        if (transactionType === "monthly") return "월세";
        return "거래유형";
    };

    // 구조 & 면적 칩이 활성화되어 있는지 확인
    const isStructureActive =
        structureType !== "all" ||
        floorType !== "all" ||
        areaType !== "all" ||
        parkingAvailable;

    // 옵션 칩이 활성화되어 있는지 확인
    const isOptionActive = amenities.length > 0;

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <TouchableOpacity
                    style={[
                        styles.chip,
                        transactionType !== "all" && styles.chipActive,
                    ]}
                    onPress={onTransactionPress}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.chipText,
                            transactionType !== "all" && styles.chipTextActive,
                        ]}
                    >
                        {getTransactionText()}
                    </Text>
                    <Text style={styles.chevron}>▼</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.chip,
                        isStructureActive && styles.chipActive,
                    ]}
                    onPress={onStructurePress}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.chipText,
                            isStructureActive && styles.chipTextActive,
                        ]}
                    >
                        구조 & 면적
                    </Text>
                    <Text style={styles.chevron}>▼</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.chip, isOptionActive && styles.chipActive]}
                    onPress={onOptionPress}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.chipText,
                            isOptionActive && styles.chipTextActive,
                        ]}
                    >
                        옵션
                    </Text>
                    {isOptionActive && (
                        <Text style={styles.badge}>{amenities.length}</Text>
                    )}
                    <Text style={styles.chevron}>▼</Text>
                </TouchableOpacity>

                {hasActiveFilters() && (
                    <TouchableOpacity
                        style={styles.resetChip}
                        onPress={onResetPress}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.resetText}>↺</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    chipActive: {
        backgroundColor: "#e3f2fd",
    },
    chipText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    chipTextActive: {
        color: "#1976d2",
    },
    chevron: {
        fontSize: 10,
        color: "#666",
        marginLeft: 4,
    },
    resetChip: {
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    resetText: {
        fontSize: 16,
        color: "#333",
    },
    badge: {
        fontSize: 10,
        color: "#fff",
        backgroundColor: "#1976d2",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 4,
        overflow: "hidden",
    },
});
