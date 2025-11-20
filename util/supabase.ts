import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

export const supabase = createClient(
    "http://127.0.0.1:54321",
    "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH", // anon key (publishable key와 동일)
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);
