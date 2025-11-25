import { getAuthService } from "@/service/auth";
import { supabase } from "@/util/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function HomeScreen() {
    const router = useRouter();
    const authService = getAuthService();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Button
                    title={loading ? "Loading..." : "Fetch Users"}
                    onPress={fetchUsers}
                    disabled={loading}
                />
            </View>

            {users.length > 0 && (
                <View style={{ marginTop: 20, padding: 10 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                        Users ({users.length}):
                    </Text>
                    {users.slice(0, 5).map((u) => (
                        <Text key={u.id} style={{ marginBottom: 5 }}>
                            {u.name} ({u.email})
                        </Text>
                    ))}
                    {users.length > 5 && (
                        <Text>... and {users.length - 5} more</Text>
                    )}
                </View>
            )}

            <Button title="Sign Out" onPress={onSignOut} />
        </View>
    );
}
