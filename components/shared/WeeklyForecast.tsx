import { FlatList } from "@/components/ui/flat-list";
import { HStack } from "@/components/ui/hstack";
import { Icon, InfoIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Box } from "../ui/box";

interface ForecastDay {
  day: string;
  highTemp: string;
  lowTemp: string;
  condition: string;
  weatherIcon: any;
  alt: string;
}

interface WeeklyForecastProps {
  forecast?: ForecastDay[];
  onPressSearch?: () => void;
}

export const WeeklyForecast = ({
  forecast,
  onPressSearch,
}: WeeklyForecastProps) => {
  const data = Array.isArray(forecast) ? forecast : [];
  return (
    <VStack className="flex-[0.6] rounded-xl bg-background-50 px-4">
      <Text className="text-typography-800 text-3xl mb-4 mt-10">This week</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        ItemSeparatorComponent={() => <Box className="h-4" />}
        ListEmptyComponent={() => (
          <HStack className="items-center  py-10 gap-4">
            <Icon as={InfoIcon} size="xl" className="text-typography-500" />
            <Text className="text-typography-500">
              No data available. Use the search button to get weather data.
            </Text>
          </HStack>
        )}
        renderItem={({ item: day }) => (
          <HStack className="justify-between items-center">
            <Text className="uppercase text-2xl text-typography-500 flex-[0.25]">
              {day.day}
            </Text>
            <HStack className="items-center gap-6 flex-[0.25]">
              <Text className="text-2xl font-bold">{day.highTemp} °</Text>
              <Text className="text-2xl text-typography-500 font-bold">
                {day.lowTemp} °
              </Text>
            </HStack>
            <HStack className="items-center gap-2 flex-[0.5]">
              <Box className="h-20 w-20">
                <Image
                  source={day.weatherIcon}
                  alt={day.alt}
                  className="h-full w-full"
                  size="md"
                  resizeMode="contain"
                />
              </Box>
              <Text className="text-typography-500 text-xl">
                {day.condition}
              </Text>
            </HStack>
          </HStack>
        )}
      />
    </VStack>
  );
};
