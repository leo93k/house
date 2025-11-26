import { getAuthService } from "@/service/auth";
import { supabase } from "@/util/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import {
    Button,
    Card,
    Input,
    Switch,
    Text,
    View,
    XStack,
    YStack,
} from "tamagui";

export default function HomeScreen() {
    const router = useRouter();
    const authService = getAuthService();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [switchValue, setSwitchValue] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .order("createdAt", { ascending: false });

            if (error) {
                console.error("Error fetching users:", error);
                Alert.alert("Error", "Failed to fetch users");
                return;
            }

            setUsers(data || []);
            console.log("Users:", data);
            Alert.alert("Success", `Found ${data?.length || 0} users`);
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const onSignOut = async () => {
        try {
            await authService.signOut();
            router.replace("/auth/login");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <YStack
                flex={1}
                padding="$4"
                gap="$4"
                backgroundColor="$background"
            >
                {/* Header */}
                <YStack alignItems="center" gap="$2">
                    <Text fontSize="$6" fontWeight="bold" color="$color">
                        Tamagui Component Examples
                    </Text>
                    <Text fontSize="$4" color="$color">
                        Login Success
                    </Text>
                </YStack>

                {/* Tamagui View Example */}
                <Card
                    padding="$4"
                    backgroundColor="$background"
                    borderColor="$borderColor"
                >
                    <YStack gap="$3">
                        <Text fontSize="$5" fontWeight="600" color="$color">
                            View Component
                        </Text>
                        <View
                            width={200}
                            height={100}
                            backgroundColor="$backgroundHover"
                            borderRadius="$4"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color="$color">Tamagui View</Text>
                        </View>
                    </YStack>
                </Card>

                {/* Tamagui Button Example */}
                <Card
                    padding="$4"
                    backgroundColor="$background"
                    borderColor="$borderColor"
                >
                    <YStack gap="$3">
                        <Text fontSize="$5" fontWeight="600" color="$color">
                            Button Component
                        </Text>
                        <XStack gap="$3" flexWrap="wrap">
                            <Button
                                onPress={fetchUsers}
                                disabled={loading}
                                backgroundColor="$backgroundPress"
                                color="$color"
                                padding="$3"
                                borderRadius="$4"
                            >
                                <Text color="$color">
                                    {loading ? "Loading..." : "Fetch Users"}
                                </Text>
                            </Button>
                            <Button
                                onPress={onSignOut}
                                backgroundColor="$backgroundFocus"
                                color="$color"
                                padding="$3"
                                borderRadius="$4"
                            >
                                <Text color="$color">Sign Out</Text>
                            </Button>
                        </XStack>
                    </YStack>
                </Card>

                {/* Tamagui Input Example */}
                <Card
                    padding="$4"
                    backgroundColor="$background"
                    borderColor="$borderColor"
                >
                    <YStack gap="$3">
                        <Text fontSize="$5" fontWeight="600" color="$color">
                            Input Component
                        </Text>
                        <Input
                            placeholder="Enter text here..."
                            value={inputValue}
                            onChangeText={setInputValue}
                            backgroundColor="$backgroundHover"
                            borderColor="$borderColor"
                            color="$color"
                            padding="$3"
                            borderRadius="$4"
                        />
                        {inputValue && (
                            <Text color="$color">You typed: {inputValue}</Text>
                        )}
                    </YStack>
                </Card>

                {/* Tamagui Switch Example */}
                <Card
                    padding="$4"
                    backgroundColor="$background"
                    borderColor="$borderColor"
                >
                    <YStack gap="$3">
                        <Text fontSize="$5" fontWeight="600" color="$color">
                            Switch Component
                        </Text>
                        <XStack alignItems="center" gap="$3">
                            <Text color="$color">Enable notifications</Text>
                            <Switch
                                checked={switchValue}
                                onCheckedChange={setSwitchValue}
                            />
                        </XStack>
                        <Text color="$color">
                            Switch is {switchValue ? "ON" : "OFF"}
                        </Text>
                    </YStack>
                </Card>

                {/* Users List */}
                {users.length > 0 && (
                    <Card
                        padding="$4"
                        backgroundColor="$background"
                        borderColor="$borderColor"
                    >
                        <YStack gap="$3">
                            <Text fontSize="$5" fontWeight="600" color="$color">
                                Users ({users.length})
                            </Text>
                            {users.slice(0, 5).map((u) => (
                                <View
                                    key={u.id}
                                    padding="$2"
                                    backgroundColor="$backgroundHover"
                                    borderRadius="$2"
                                >
                                    <Text color="$color" fontWeight="500">
                                        {u.name}
                                    </Text>
                                    <Text color="$color" fontSize="$3">
                                        {u.email}
                                    </Text>
                                </View>
                            ))}
                            {users.length > 5 && (
                                <Text color="$color" fontSize="$3">
                                    ... and {users.length - 5} more
                                </Text>
                            )}
                        </YStack>
                    </Card>
                )}

                {/* Color Examples */}
                <Card
                    padding="$4"
                    backgroundColor="$background"
                    borderColor="$borderColor"
                >
                    <YStack gap="$3">
                        <Text fontSize="$5" fontWeight="600" color="$color">
                            Theme Colors
                        </Text>
                        <XStack gap="$2" flexWrap="wrap">
                            <View
                                width={60}
                                height={60}
                                backgroundColor="$background"
                                borderRadius="$2"
                                borderWidth={1}
                                borderColor="$borderColor"
                            />
                            <View
                                width={60}
                                height={60}
                                backgroundColor="$backgroundHover"
                                borderRadius="$2"
                            />
                            <View
                                width={60}
                                height={60}
                                backgroundColor="$backgroundPress"
                                borderRadius="$2"
                            />
                        </XStack>
                        <Text color="$color" fontSize="$3">
                            Using $background, $backgroundHover,
                            $backgroundPress
                        </Text>
                    </YStack>
                </Card>
            </YStack>
        </ScrollView>
    );
}
