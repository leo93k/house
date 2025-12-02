import { useVisibleItemsStore } from "@/store";
import { useCallback, useRef, useState } from "react";
import { Platform } from "react-native";
import type { WebView } from "react-native-webview";
import type { VisibleItemsUpdateMessage } from "../types/mapPostMessage.types";
import { MessageType } from "../types/mapPostMessage.types";

interface UseMapWebViewOptions {
    onError?: (error: string) => void;
    onVisibleItemsUpdate?: (count: number) => void;
}

export function useMapWebView(options: UseMapWebViewOptions = {}) {
    const { onError, onVisibleItemsUpdate } = options;
    const webViewRef = useRef<WebView>(null);
    const [webViewError, setWebViewError] = useState<string | null>(null);
    const [visibleItemsCount, setVisibleItemsCount] = useState<number>(0);
    const { setVisibleItems } = useVisibleItemsStore();

    // 에러 설정 헬퍼
    const setError = useCallback(
        (error: string) => {
            setWebViewError(error);
            onError?.(error);
        },
        [onError]
    );

    // 플랫폼에 따라 URL 결정
    const getLocalUrl = useCallback(() => {
        // 환경 변수가 있으면 우선 사용
        if (process.env.EXPO_PUBLIC_LOCAL_SERVER_URL) {
            return `${process.env.EXPO_PUBLIC_LOCAL_SERVER_URL}`;
        }

        if (Platform.OS === "android") {
            return "http://10.0.2.2:5500";
        }

        return "http://localhost:5500";
    }, []);

    // URL 정보 처리
    const handleUrlInfo = useCallback((data: Record<string, unknown>) => {
        console.log("WebView URL 정보:", {
            href: data.href,
            origin: data.origin,
            protocol: data.protocol,
            host: data.host,
            hostname: data.hostname,
            port: data.port,
            pathname: data.pathname,
            search: data.search,
            hash: data.hash,
        });
    }, []);

    // 스크립트 상태 처리
    const handleScriptStatus = useCallback(
        (data: Record<string, unknown>) => {
            console.log(
                `[Script Status] ${Platform.OS} - ${data.message}:`,
                data.status || data
            );

            // iOS에서 SDK 로드 상태 상세 확인
            if (
                Platform.OS === "ios" &&
                data.message === "스크립트 로드 완료"
            ) {
                console.log(`[iOS SDK Check]:`, {
                    kakaoExists: data.kakaoExists,
                    kakaoMapsExists: data.kakaoMapsExists,
                    latLngExists: data.latLngExists,
                    latLngIsFunction: data.latLngIsFunction,
                    mapExists: data.mapExists,
                    mapIsFunction: data.mapIsFunction,
                });

                // SDK가 제대로 로드되지 않은 경우
                if (!data.latLngIsFunction || !data.mapIsFunction) {
                    console.error(`[iOS SDK Load Failed]:`, data);
                    setError(
                        `iOS SDK 로드 실패:\n` +
                            `kakao: ${data.kakaoExists}\n` +
                            `kakao.maps: ${data.kakaoMapsExists}\n` +
                            `LatLng: ${data.latLngIsFunction}\n` +
                            `Map: ${data.mapIsFunction}`
                    );
                }
            }

            // 스크립트 로드 실패나 타임아웃인 경우 에러로 처리
            const message = data.message as string | undefined;
            if (message?.includes("실패") || message?.includes("타임아웃")) {
                console.error(
                    `[Script Status Error] ${Platform.OS} - ${message}:`,
                    data
                );
                setError(`스크립트 로드 문제: ${message}`);
            }
        },
        [setError]
    );

    // 보이는 매물 정보 업데이트 처리
    const handleVisibleItemsUpdate = useCallback(
        (data: VisibleItemsUpdateMessage) => {
            console.log("=== 보이는 매물 정보 업데이트 ===");
            console.log(`매물 개수: ${data.count}`);
            console.log(`타임스탬프: ${data.timestamp}`);
            console.log("매물 목록:", data.items);

            // 보이는 매물 개수 업데이트
            setVisibleItemsCount(data.count);
            onVisibleItemsUpdate?.(data.count);

            // 매물 리스트 저장 (타입 변환: feature/map의 PropertyItem을 store의 PropertyItem으로)
            setVisibleItems(
                data.items as unknown as Parameters<typeof setVisibleItems>[0],
                data.count,
                data.timestamp
            );

            // 각 매물의 상세 정보 출력
            data.items.forEach((item, index) => {
                console.log(`매물 ${index + 1}:`, item);
            });

            console.log("================================");
        },
        [setVisibleItems, onVisibleItemsUpdate]
    );

    // 타입 가드: VisibleItemsUpdateMessage인지 확인
    const isVisibleItemsUpdateMessage = (
        data: unknown
    ): data is VisibleItemsUpdateMessage => {
        if (typeof data !== "object" || data === null) {
            return false;
        }
        const obj = data as Record<string, unknown>;
        return (
            obj.type === MessageType.VISIBLE_ITEMS_UPDATE &&
            typeof obj.count === "number" &&
            typeof obj.timestamp === "string" &&
            Array.isArray(obj.items)
        );
    };

    // VISIBLE_ITEMS_UPDATE 메시지 처리 (에러 핸들링 포함)
    const processVisibleItemsUpdate = useCallback(
        (data: Record<string, unknown>) => {
            try {
                if (isVisibleItemsUpdateMessage(data)) {
                    handleVisibleItemsUpdate(data);
                } else {
                    const errorMsg =
                        "Invalid VISIBLE_ITEMS_UPDATE message format";
                    console.warn(errorMsg, data);
                    setError(errorMsg);
                }
            } catch (error) {
                const errorMsg = "Failed to process visible items update";
                console.error(errorMsg, error);
                setError(errorMsg);
            }
        },
        [handleVisibleItemsUpdate, setError]
    );

    // 메인 메시지 핸들러
    const handleWebViewMessage = useCallback(
        (event: { nativeEvent: { data: string } }) => {
            try {
                const data = event.nativeEvent.data;

                let parsedData: Record<string, unknown>;

                // JSON 문자열인 경우 파싱
                try {
                    parsedData = JSON.parse(data);
                } catch {
                    // JSON이 아니면 문자열로 처리
                    parsedData = { type: "MESSAGE", message: data };
                }
                console.log({ parsedData });

                const messageType = parsedData.type as string;

                // 메시지 타입에 따라 적절한 핸들러 호출
                switch (messageType) {
                    case MessageType.VISIBLE_ITEMS_UPDATE:
                        processVisibleItemsUpdate(parsedData);
                        break;
                    default:
                        // 일반 메시지는 console.log로 출력
                        console.log("WEBVIEW MSG:", parsedData);
                        break;
                }
            } catch (error) {
                console.error("Error handling postMessage:", error);
            }
        },
        [processVisibleItemsUpdate]
    );

    // WebView에 ReactNativeWebView.postMessage 헬퍼 함수 주입
    const injectedJavaScript = `
        (function() {
            // ReactNativeWebView.postMessage가 없으면 window.postMessage를 래핑
            if (typeof window.ReactNativeWebView === 'undefined') {
                console.warn('ReactNativeWebView is not available');
            }
            
            // window.postMessage를 ReactNativeWebView.postMessage로 리다이렉트하는 헬퍼
            const originalPostMessage = window.postMessage;
            window.postMessage = function(message, targetOrigin) {
                // ReactNativeWebView가 있으면 우선 사용
                if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
                    window.ReactNativeWebView.postMessage(messageStr);
                } else {
                    // 없으면 원래 postMessage 사용 (일반 웹 환경)
                    originalPostMessage.call(window, message, targetOrigin);
                }
            };
            
            console.log('ReactNativeWebView postMessage helper injected');
        })();
        true;
    `;

    return {
        webViewRef,
        webViewError,
        visibleItemsCount,
        getLocalUrl,
        handleWebViewMessage,
        injectedJavaScript,
        setError,
    };
}
