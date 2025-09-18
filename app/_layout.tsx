import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider, useTheme } from "@/context/theme";
import "@/global.css";
import { StatusBar } from "expo-status-bar";

function Providers() {
  const { theme } = useTheme();
  return (
    <GluestackUIProvider mode={theme}>
      <StatusBar style="auto" />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="weather" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Providers />
    </ThemeProvider>
  );
}
