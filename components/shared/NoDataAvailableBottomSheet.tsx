import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useTheme } from "@/context/theme";
import { fetchCityWeather } from "@/services/api";
import { useWeatherStore } from "@/store/store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";

export default function NoDataAvailable({
  onClosed,
}: {
  onClosed?: () => void;
}) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const units = useWeatherStore((s) => s.units);
  const setCoords = useWeatherStore((s) => s.setCoords);
  const toast = useToast();

  // bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["80%"], []);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClosed && onClosed();
      }
    },
    [onClosed]
  );

  async function handleSearch() {
    console
    if (!city.trim()) return;
    setLoading(true);
    try {
      const data = await fetchCityWeather(city.trim(), units);
      setCoords({ lat: data.coord.lat, lon: data.coord.lon });
      // close the sheet on success
      bottomSheetRef.current?.close();
    } catch (err: any) {
      const message =
        err?.message || "Failed to fetch city weather, try again!";
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast action="error" variant="solid">
            <ToastTitle size="md">Search failed</ToastTitle>
            <ToastDescription size="sm">{message}</ToastDescription>
          </Toast>
        ),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: isDark ? "#111" : "#fff" }}
      handleIndicatorStyle={{ backgroundColor: isDark ? "#444" : "#ddd" }}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose
    >
      <BottomSheetView className="p-4 items-center">
        <VStack space="lg" className="w-full max-w-md items-center p-4">
          <Text
            className={`text-2xl font-bold text-center ${
              theme === "dark" ? "text-typography-100" : "text-typography-900"
            }`}
          >
            Location Unavailable
          </Text>
          <Text
            className={`text-md text-center ${
              theme === "dark" ? "text-typography-400" : "text-typography-600"
            }`}
          >
            We couldn’t access your location. Search for a city manually.
          </Text>

          <Input variant="outline" className="w-full">
            <InputField
              placeholder="Enter city name..."
              value={city}
              onChangeText={setCity}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
          </Input>

          <Button
            className="w-full"
            onPress={handleSearch}
            isDisabled={loading || !city.trim()}
          >
            {loading ? (
              <Spinner size="small" />
            ) : (
              <ButtonText>Search</ButtonText>
            )}
          </Button>
        </VStack>
      </BottomSheetView>
    </BottomSheet>
  );
}
