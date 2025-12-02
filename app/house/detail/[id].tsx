import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useVisibleItemsStore, type PropertyItem } from "@/store";

export default function HouseDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { items } = useVisibleItemsStore();
    const [property, setProperty] = useState<PropertyItem | null>(null);

    useEffect(() => {
        if (!id) {
            router.back();
            return;
        }

        // store에서 해당 매물 찾기
        const itemId = parseInt(id, 10);
        const foundItem = items.find(
            (item) => item.itemId === itemId || items.indexOf(item) + 1 === itemId
        );

        if (foundItem) {
            setProperty(foundItem);
        } else {
            // 매물을 찾지 못한 경우 이전 화면으로 돌아가기
            router.back();
        }
    }, [id, items, router]);

    if (!property) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>로딩 중...</Text>
            </View>
        );
    }

    // 가격 정보 포맷팅
    const formatPrice = (price: unknown) => {
        if (typeof price === "number") {
            return new Intl.NumberFormat("ko-KR").format(price);
        }
        return String(price || "-");
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 헤더 */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        매물 #{property.itemId || "정보 없음"}
                    </Text>
                </View>

                {/* 위치 정보 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>위치 정보</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>위도:</Text>
                        <Text style={styles.infoValue}>
                            {property.lat?.toFixed(6) || "-"}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>경도:</Text>
                        <Text style={styles.infoValue}>
                            {property.lng?.toFixed(6) || "-"}
                        </Text>
                    </View>
                    {property.address && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>주소:</Text>
                            <Text style={styles.infoValue}>
                                {String(property.address)}
                            </Text>
                        </View>
                    )}
                </View>

                {/* 가격 정보 */}
                {(property.deposit ||
                    property.rent ||
                    property.monthlyRent ||
                    property.price) ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>가격 정보</Text>
                        {property.deposit ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>보증금:</Text>
                                <Text style={styles.infoValue}>
                                    {formatPrice(property.deposit)}원
                                </Text>
                            </View>
                        ) : null}
                        {(property.rent || property.monthlyRent) ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>월세:</Text>
                                <Text style={styles.infoValue}>
                                    {formatPrice(property.rent || property.monthlyRent)}원
                                </Text>
                            </View>
                        ) : null}
                        {property.maintenanceFee ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>관리비:</Text>
                                <Text style={styles.infoValue}>
                                    {formatPrice(property.maintenanceFee)}원
                                </Text>
                            </View>
                        ) : null}
                        {property.price ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>매매가:</Text>
                                <Text style={styles.infoValue}>
                                    {formatPrice(property.price)}원
                                </Text>
                            </View>
                        ) : null}
                    </View>
                ) : null}

                {/* 건물 정보 */}
                {(property.buildingType ||
                    property.roomType ||
                    property.floor ||
                    property.totalFloors ||
                    property.supplyArea ||
                    property.exclusiveArea ||
                    property.yearBuilt) ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>건물 정보</Text>
                        {property.buildingType ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>건물 유형:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.buildingType)}
                                </Text>
                            </View>
                        ) : null}
                        {property.roomType ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>방 유형:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.roomType)}
                                </Text>
                            </View>
                        ) : null}
                        {property.floor ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>층수:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.floor)}층
                                </Text>
                            </View>
                        ) : null}
                        {property.totalFloors ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>건물 층수:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.totalFloors)}층
                                </Text>
                            </View>
                        ) : null}
                        {property.supplyArea ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>공급면적:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.supplyArea)}㎡
                                </Text>
                            </View>
                        ) : null}
                        {property.exclusiveArea ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>전용면적:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.exclusiveArea)}㎡
                                </Text>
                            </View>
                        ) : null}
                        {property.yearBuilt ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>건축년도:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.yearBuilt)}년
                                </Text>
                            </View>
                        ) : null}
                    </View>
                ) : null}

                {/* 옵션 정보 */}
                {(property.parking ||
                    property.elevator !== undefined ||
                    property.pet !== undefined ||
                    property.shortTerm !== undefined) ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>옵션</Text>
                        {property.parking ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>주차:</Text>
                                <Text style={styles.infoValue}>
                                    {String(property.parking)}
                                </Text>
                            </View>
                        ) : null}
                        {property.elevator !== undefined ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>엘리베이터:</Text>
                                <Text style={styles.infoValue}>
                                    {property.elevator ? "있음" : "없음"}
                                </Text>
                            </View>
                        ) : null}
                        {property.pet !== undefined ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>반려동물:</Text>
                                <Text style={styles.infoValue}>
                                    {property.pet ? "가능" : "불가능"}
                                </Text>
                            </View>
                        ) : null}
                        {property.shortTerm !== undefined ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>단기임대:</Text>
                                <Text style={styles.infoValue}>
                                    {property.shortTerm ? "가능" : "불가능"}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                ) : null}

                {/* 기타 정보 */}
                {Object.entries(property)
                    .filter(
                        ([key]) =>
                            ![
                                "itemId",
                                "lat",
                                "lng",
                                "address",
                                "deposit",
                                "rent",
                                "monthlyRent",
                                "maintenanceFee",
                                "price",
                                "buildingType",
                                "roomType",
                                "floor",
                                "totalFloors",
                                "supplyArea",
                                "exclusiveArea",
                                "yearBuilt",
                                "parking",
                                "elevator",
                                "pet",
                                "shortTerm",
                            ].includes(key)
                    )
                    .length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>기타 정보</Text>
                        {Object.entries(property)
                            .filter(
                                ([key]) =>
                                    ![
                                        "itemId",
                                        "lat",
                                        "lng",
                                        "address",
                                        "deposit",
                                        "rent",
                                        "monthlyRent",
                                        "maintenanceFee",
                                        "price",
                                        "buildingType",
                                        "roomType",
                                        "floor",
                                        "totalFloors",
                                        "supplyArea",
                                        "exclusiveArea",
                                        "yearBuilt",
                                        "parking",
                                        "elevator",
                                        "pet",
                                        "shortTerm",
                                    ].includes(key)
                            )
                            .map(([key, value]) => (
                                <View key={key} style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>
                                        {key}:
                                    </Text>
                                    <Text style={styles.infoValue}>
                                        {String(value)}
                                    </Text>
                                </View>
                            ))}
                    </View>
                )}
            </ScrollView>

            {/* 하단 버튼 */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.contactButton}
                    activeOpacity={0.8}
                    onPress={() => {
                        console.log("문의하기 버튼 클릭");
                        // TODO: 문의하기 기능 구현
                    }}
                >
                    <Text style={styles.contactButtonText}>문의하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    loadingText: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
        marginTop: 40,
    },
    header: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
    },
    section: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: "row",
        marginBottom: 8,
        flexWrap: "wrap",
    },
    infoLabel: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
        minWidth: 100,
        marginRight: 8,
    },
    infoValue: {
        fontSize: 14,
        color: "#333",
        flex: 1,
    },
    bottomButtonContainer: {
        padding: 16,
        paddingBottom: 34,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    contactButton: {
        backgroundColor: "#1976d2",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    contactButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

