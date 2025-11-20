import { getAuthService } from "@/service/auth";
import { useUserStore } from "@/store";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
    const router = useRouter();
    const { user } = useUserStore();
    const authService = getAuthService();

    const onSignOut = async () => {
        try {
            await authService.signOut();
            router.replace("/auth/login");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <View
            className="flex-1 items-center justify-center"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View>
                <Text>Login Success</Text>
            </View>

            <Button title="Sign Out" onPress={onSignOut} />
        </View>
    );
}
