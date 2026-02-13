import { Stack } from "expo-router";

export default function DebtLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="upsert"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
