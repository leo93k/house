import { useAuthGuard } from "@/hooks/use-auth-guard";
import { getAuthService } from "@/service/auth/authService";
import { Alert, Button, Text, View } from "react-native";

export default function HomeScreen() {
    const { user } = useAuthGuard();
    const authService = getAuthService();

    const handleSignOut = async () => {
        try {
            await authService.signOut();
            // 로그아웃 성공 시 authService의 onAuthStateChanged가 자동으로
            // store를 업데이트하고, index.tsx에서 /login으로 리다이렉트됨
        } catch (error: any) {
            console.error("로그아웃 실패:", error);
            Alert.alert(
                "로그아웃 실패",
                error.message || "로그아웃 중 오류가 발생했습니다."
            );
        }
    };

    if (!user) {
        return null; // 리다이렉트 중
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>HomeScreen</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Text>{user.email}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}
