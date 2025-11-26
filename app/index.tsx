import { Header } from "@/components/layout/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card, Text, View, XStack, YStack, useTheme } from "tamagui";

export default function HomeScreen() {
    const router = useRouter();
    const theme = useTheme();

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <YStack flex={1} backgroundColor="$background" paddingBottom="$6">
                {/* Header */}
                <Header title="House" />

                {/* Main Content */}
                <YStack padding="$4" gap="$6">
                    {/* Welcome Section */}
                    <YStack alignItems="center" gap="$2">
                        <Text
                            fontSize="$6"
                            fontWeight="600"
                            color="$color"
                            textAlign="center"
                        >
                            What are you looking for?
                        </Text>
                    </YStack>

                    {/* Category Cards */}
                    <YStack gap="$4">
                        {/* House Card */}
                        <TouchableOpacity
                            onPress={() => router.push("/house" as any)}
                            accessibilityLabel="Browse houses"
                            accessibilityRole="button"
                            activeOpacity={0.7}
                        >
                            <Card
                                padding="$5"
                                backgroundColor="$background"
                                borderColor="$borderColor"
                                borderWidth={1}
                                borderRadius="$3"
                                elevation={2}
                            >
                                <XStack alignItems="center" gap="$4">
                                    <View
                                        width={60}
                                        height={60}
                                        borderRadius="$3"
                                        backgroundColor="$backgroundHover"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <MaterialIcons
                                            name="home"
                                            size={32}
                                            color={
                                                theme.color?.get() || "#11181C"
                                            }
                                        />
                                    </View>
                                    <YStack flex={1} gap="$1">
                                        <Text
                                            fontSize="$5"
                                            fontWeight="600"
                                            color="$color"
                                        >
                                            🏠 HOUSE
                                        </Text>
                                        <Text fontSize="$4" color="$color">
                                            Find your perfect home
                                        </Text>
                                    </YStack>
                                    <MaterialIcons
                                        name="chevron-right"
                                        size={24}
                                        color={theme.color?.get() || "#11181C"}
                                    />
                                </XStack>
                            </Card>
                        </TouchableOpacity>

                        {/* Car Card */}
                        <TouchableOpacity
                            onPress={() => router.push("/car" as any)}
                            accessibilityLabel="Browse cars"
                            accessibilityRole="button"
                            activeOpacity={0.7}
                        >
                            <Card
                                padding="$5"
                                backgroundColor="$background"
                                borderColor="$borderColor"
                                borderWidth={1}
                                borderRadius="$3"
                                elevation={2}
                            >
                                <XStack alignItems="center" gap="$4">
                                    <View
                                        width={60}
                                        height={60}
                                        borderRadius="$3"
                                        backgroundColor="$backgroundHover"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <MaterialIcons
                                            name="directions-car"
                                            size={32}
                                            color={
                                                theme.color?.get() || "#11181C"
                                            }
                                        />
                                    </View>
                                    <YStack flex={1} gap="$1">
                                        <Text
                                            fontSize="$5"
                                            fontWeight="600"
                                            color="$color"
                                        >
                                            🚗 CAR
                                        </Text>
                                        <Text fontSize="$4" color="$color">
                                            Find your dream car
                                        </Text>
                                    </YStack>
                                    <MaterialIcons
                                        name="chevron-right"
                                        size={24}
                                        color={theme.color?.get() || "#11181C"}
                                    />
                                </XStack>
                            </Card>
                        </TouchableOpacity>

                        {/* ETC Card */}
                        <TouchableOpacity
                            onPress={() => router.push("/etc" as any)}
                            accessibilityLabel="Browse used items"
                            accessibilityRole="button"
                            activeOpacity={0.7}
                        >
                            <Card
                                padding="$5"
                                backgroundColor="$background"
                                borderColor="$borderColor"
                                borderWidth={1}
                                borderRadius="$3"
                                elevation={2}
                            >
                                <XStack alignItems="center" gap="$4">
                                    <View
                                        width={60}
                                        height={60}
                                        borderRadius="$3"
                                        backgroundColor="$backgroundHover"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <MaterialIcons
                                            name="inventory-2"
                                            size={32}
                                            color={
                                                theme.color?.get() || "#11181C"
                                            }
                                        />
                                    </View>
                                    <YStack flex={1} gap="$1">
                                        <Text
                                            fontSize="$5"
                                            fontWeight="600"
                                            color="$color"
                                        >
                                            📦 ETC
                                        </Text>
                                        <Text fontSize="$4" color="$color">
                                            Browse used items
                                        </Text>
                                    </YStack>
                                    <MaterialIcons
                                        name="chevron-right"
                                        size={24}
                                        color={theme.color?.get() || "#11181C"}
                                    />
                                </XStack>
                            </Card>
                        </TouchableOpacity>
                    </YStack>
                </YStack>
            </YStack>
        </ScrollView>
    );
}
