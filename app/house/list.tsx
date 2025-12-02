import { useVisibleItemsStore, type PropertyItem } from "@/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HouseListScreen() {
    const router = useRouter();
    const { items, count, timestamp } = useVisibleItemsStore();

    useEffect(() => {
        // 매물이 없으면 이전 화면으로 돌아가기
        if (count === 0) {
            router.back();
        }
    }, [count, router]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>지역 매물 {count}개</Text>
                {timestamp && (
                    <Text style={styles.headerSubtitle}>
                        {new Date(timestamp).toLocaleString("ko-KR")}
                    </Text>
                )}
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {items.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            표시할 매물이 없습니다.
                        </Text>
                    </View>
                ) : (
                    items.map((item: PropertyItem, index: number) => (
                        <TouchableOpacity
                            key={item.itemId || index}
                            style={styles.itemCard}
                            activeOpacity={0.7}
                            onPress={() => {
                                const itemId = item.itemId || index + 1;
                                router.push(`/house/detail/${itemId}`);
                            }}
                        >
                            <Text style={styles.itemTitle}>
                                매물 #{item.itemId || index + 1}
                            </Text>
                            <Text style={styles.itemInfo}>
                                위치: {item.lat?.toFixed(6)},{" "}
                                {item.lng?.toFixed(6)}
                            </Text>
                            {/* 매물의 다른 속성들 표시 */}
                            {Object.entries(item)
                                .filter(
                                    ([key]) =>
                                        !["itemId", "lat", "lng"].includes(key)
                                )
                                .map(([key, value]) => (
                                    <Text key={key} style={styles.itemDetail}>
                                        {key}: {String(value)}
                                    </Text>
                                ))}
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        backgroundColor: "#f5f5f5",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#666",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
    },
    itemCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    itemInfo: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    itemDetail: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
});
