import auth, {
    getAuth,
    onAuthStateChanged,
    signOut,
} from "@react-native-firebase/auth";

import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

GoogleSignin.configure({
    webClientId:
        "945586864109-qlfnrp1i4upjt06o620t7pqm52909681.apps.googleusercontent.com",
});

export default function HomeScreen() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<any>();

    function handleAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(
            getAuth(),
            handleAuthStateChanged
        );
        return subscriber; // unsubscribe on unmount
    }, []);

    const signIn = async () => {
        try {
            console.log("signIn");
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const response = await GoogleSignin.signIn();
            console.log("response", response);

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(
                response.data?.idToken
            );

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.error(error);
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        console.log(
                            "operation (eg. sign in) already in progress"
                        );
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // Android only, play services not available or outdated
                        console.log(
                            "Android only, play services not available or outdated"
                        );
                        break;
                    default:
                    // some other error happened
                }
            } else {
                // an error that's not related to google sign in occurred
            }
        }
    };

    const logout = async () => {
        await signOut(getAuth());
    };

    if (initializing) return null;

    if (user) {
        return (
            <SafeAreaView>
                <Text>{user.email}</Text>
                <Button title="Sign Out" onPress={logout} />
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <GoogleSigninButton
                    onPress={signIn}
                    color={GoogleSigninButton.Color.Dark}
                />
            </SafeAreaView>
        );
    }
}
