import { DarkTheme, LightTheme } from '@/constants/theme';
import { initDatabase } from '@/database/db';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  const colorScheme = useColorScheme()

  React.useEffect(() => {
    //dropDatabase()
    initDatabase();
  }, []);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LoadingProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </LoadingProvider>
    </GestureHandlerRootView>
  );
}
