import { ScrollView } from "react-native";
import { Text, YStack } from "tamagui";
import { Header } from "@/components/layout/Header";

export default function CarScreen() {
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <YStack flex={1} backgroundColor="$background" paddingBottom="$6">
                <Header title="Car" />
                <YStack padding="$4" gap="$4">
                    <Text fontSize="$6" fontWeight="600" color="$color">
                        Car Screen
                    </Text>
                    <Text fontSize="$4" color="$color">
                        중고차 화면 (구현 예정)
                    </Text>
                </YStack>
            </YStack>
        </ScrollView>
    );
}

