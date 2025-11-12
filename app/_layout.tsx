import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { getAuthService } from "@/service/auth/authService";

// 하단 탭을 사용하지 않으므로 anchor 설정 제거

export default function RootLayout() {
    const colorScheme = useColorScheme();

    // 앱 시작 시 authService 초기화
    // 이렇게 하면 authService.ts의 초기화 로직이 실행되어
    // 사용자 상태를 확인하고 Zustand store를 업데이트합니다.
    useEffect(() => {
        getAuthService();
    }, []);

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerShown: false, // 모든 화면의 header 숨기기
                    }}
                >
                    <Stack.Screen
                        name="modal"
                        options={{ presentation: "modal" }}
                    />
                </Stack>
                <StatusBar style={"auto"} animated />
            </SafeAreaView>
        </ThemeProvider>
    );
}
