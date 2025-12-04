import { GlobalModal } from "@/components/GlobalModal";
import { TamaguiProvider } from "@tamagui/core";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useColorScheme } from "react-native";
import { config } from "../tamagui.config";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    useAuthGuard();

    return (
        <SafeAreaProvider>
            <TamaguiProvider
                config={config}
                defaultTheme={colorScheme === "dark" ? "dark" : "light"}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen
                            name="index"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="house"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="auth/login"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="modal"
                            options={{
                                presentation: "modal",
                                title: "Modal",
                            }}
                        />
                    </Stack>
                    <StatusBar style="auto" />
                    {/* 전역 모달 */}
                    <GlobalModal />
                </SafeAreaView>
            </TamaguiProvider>
        </SafeAreaProvider>
    );
}
