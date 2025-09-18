import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeProvider, useTheme } from "@/context/theme";
import "@/global.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const title =
        typeof query?.queryKey?.[0] === "string"
          ? `Error: ${query.queryKey[0]}`
          : "Error";
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      Alert.alert(title, message);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

function Providers() {
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={theme}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="+not-found"
            options={{
              title: "Page Not Found",
              headerShown: true,
              presentation: "modal",
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Providers />
    </ThemeProvider>
  );
}
