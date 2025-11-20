/**
 * 인증 서비스 설정
 */

export const AUTH_CONFIG = {
    google: {
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB || "",
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS || "",
    },
};
