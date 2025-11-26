import { ScrollView } from "react-native";
import { Text, YStack, useTheme } from "tamagui";
import { Header } from "@/components/layout/Header";

export default function EtcScreen() {
    const theme = useTheme();

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme.background?.get() || "#fff",
            }}
            showsVerticalScrollIndicator={false}
        >
            <YStack flex={1} backgroundColor="$background" paddingBottom="$6">
                <Header title="ETC" />
                <YStack padding="$4" gap="$4">
                    <Text fontSize="$6" fontWeight="600" color="$color">
                        ETC Screen
                    </Text>
                    <Text fontSize="$4" color="$color">
                        중고 물품 화면 (구현 예정)
                    </Text>
                </YStack>
            </YStack>
        </ScrollView>
    );
}

