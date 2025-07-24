import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const qc = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
