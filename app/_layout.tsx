import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DarkTheme, LightTheme } from '@/constants/theme';
import { initDatabase } from '@/database/db';
import { LoadingProvider } from '@/providers/LoadingProvider';
import React from 'react';
import { useColorScheme } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  const colorScheme = useColorScheme()

  React.useEffect(() => {
    initDatabase();
  }, []);


  return (
    <LoadingProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </LoadingProvider>
  );
}
