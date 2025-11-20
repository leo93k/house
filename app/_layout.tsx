import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    useAuthGuard();

    return (
        <SafeAreaProvider>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack>
                        <Stack.Screen
                            name="index"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="auth/login"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="modal"
                            options={{ presentation: "modal", title: "Modal" }}
                        />
                    </Stack>
                    <StatusBar style="auto" />
                </SafeAreaView>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
