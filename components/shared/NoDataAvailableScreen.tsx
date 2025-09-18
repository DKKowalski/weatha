import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { fetchCityWeather } from "@/services/api";
import { useWeatherStore } from "@/store/store";
import { useState } from "react";
import { Alert } from "react-native";

export default function NoDataAvailable() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const units = useWeatherStore((s) => s.units);
  const setCoords = useWeatherStore((s) => s.setCoords);

  async function handleSearch() {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const data = await fetchCityWeather(city.trim(), units);
      setCoords({ lat: data.coord.lat, lon: data.coord.lon });
    } catch (err: any) {
      Alert.alert(err.message || "Failed to fetch city weather, try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box className="flex-1 justify-center items-center px-6 bg-background-0">
      <VStack space="lg" className="w-full max-w-md items-center">
        <Text className="text-2xl font-bold text-center text-text-900">
          Location Unavailable
        </Text>
        <Text className="text-md text-center text-text-600">
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
          {loading ? <Spinner size="small" /> : <ButtonText>Search</ButtonText>}
        </Button>
      </VStack>
    </Box>
  );
}
