import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Text, View, XStack, useTheme } from "tamagui";

export interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    const router = useRouter();
    const theme = useTheme();

    // 기본 동작: Avatar 클릭 시 프로필로 이동
    const handleAvatarPress = () => {
        router.push("/profile" as any);
    };

    // 기본 우측 액션: 찜하기, 알림
    const defaultRightActions = [
        {
            icon: "favorite-border" as keyof typeof MaterialIcons.glyphMap,
            onPress: () => router.push("/saved" as any),
            accessibilityLabel: "Saved items",
        },
        {
            icon: "notifications-none" as keyof typeof MaterialIcons.glyphMap,
            onPress: () => router.push("/notifications" as any),
            accessibilityLabel: "Notifications",
        },
    ];

    return (
        <XStack
            paddingHorizontal="$4"
            paddingVertical="$3"
            alignItems="center"
            justifyContent="space-between"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
            backgroundColor="$background"
        >
            {/* Avatar */}
            <TouchableOpacity
                onPress={handleAvatarPress}
                accessibilityLabel="Profile"
                accessibilityRole="button"
            >
                <View
                    width={40}
                    height={40}
                    borderRadius={20}
                    backgroundColor="$backgroundHover"
                    alignItems="center"
                    justifyContent="center"
                >
                    <MaterialIcons
                        name="person"
                        size={24}
                        color={theme.color?.get() || "#11181C"}
                    />
                </View>
            </TouchableOpacity>

            {/* Title */}
            <Text fontSize="$6" fontWeight="600" color="$color">
                {title}
            </Text>

            {/* Right Actions */}
            <XStack gap="$3" alignItems="center">
                {defaultRightActions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={action.onPress}
                        accessibilityLabel={action.accessibilityLabel}
                        accessibilityRole="button"
                    >
                        <MaterialIcons
                            name={action.icon}
                            size={24}
                            color={theme.color?.get() || "#11181C"}
                        />
                    </TouchableOpacity>
                ))}
            </XStack>
        </XStack>
    );
}

