import { FilterChips } from "@/feature/house/components";
import { useMapWebView } from "@/feature/map/hooks";
import { useFilterStore, useModalStore } from "@/store";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

export default function HouseScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const { openModal } = useModalStore();

    // 헤더 숨기기
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    // Map WebView hook 사용
    const {
        webViewRef,
        visibleItemsCount,
        getLocalUrl,
        handleWebViewMessage,
        injectedJavaScript,
    } = useMapWebView();

    const resetFilters = useFilterStore((state) => state.resetFilters);

    const handleTransactionPress = () => {
        openModal("filter", "transaction");
    };

    const handleStructurePress = () => {
        openModal("filter", "structure");
    };

    const handleOptionPress = () => {
        openModal("filter", "option");
    };

    const handleResetPress = () => {
        // Reset은 모달을 열지 않고 바로 실행
        resetFilters();
    };

    return (
        <View style={styles.container}>
            {/* 필터 칩 */}
            <FilterChips
                onTransactionPress={handleTransactionPress}
                onStructurePress={handleStructurePress}
                onOptionPress={handleOptionPress}
                onResetPress={handleResetPress}
            />
            <View style={styles.webviewContainer}>
                <WebView
                    ref={webViewRef}
                    source={{
                        uri: getLocalUrl(),
                    }}
                    style={styles.webview}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    originWhitelist={["*"]}
                    injectedJavaScript={injectedJavaScript}
                    // iOS WebView 네트워크 및 보안 설정
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                    allowsBackForwardNavigationGestures={true}
                    // User-Agent 설정 (일부 서버에서 WebView 차단 방지)
                    userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Mobile/15E148 Safari/604.1"
                    onMessage={handleWebViewMessage}
                />
            </View>
            {/* 하단 고정 버튼 */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.bottomButton}
                    activeOpacity={0.8}
                    onPress={() => {
                        if (visibleItemsCount > 0) {
                            router.push("/house/list");
                        } else {
                            console.log("보이는 매물이 없습니다.");
                        }
                    }}
                >
                    <Text style={styles.bottomButtonText}>
                        지역 매물 보기 {visibleItemsCount}개
                    </Text>
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
    errorContainer: {
        backgroundColor: "#ffebee",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f44336",
    },
    errorText: {
        color: "#c62828",
        fontSize: 12,
        lineHeight: 18,
    },
    webviewContainer: {
        flex: 1, // 각 WebView가 화면의 절반씩 차지
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        position: "relative",
    },
    locationInfo: {
        backgroundColor: "#e3f2fd",
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#90caf9",
    },
    locationText: {
        color: "#1565c0",
        fontSize: 12,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: "#666",
    },
    bottomButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === "ios" ? 34 : 16,
        paddingTop: 12,
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
    bottomButton: {
        backgroundColor: "#1976d2",
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
