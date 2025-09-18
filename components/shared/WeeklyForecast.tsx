import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
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
  forecast: ForecastDay[];
}

export const WeeklyForecast = ({ forecast }: WeeklyForecastProps) => {
  return (
    <VStack className="flex-[0.6] rounded-xl bg-background-50 px-4">
      <Text className="text-typography-800 text-3xl mb-4 mt-10">This week</Text>
      <ScrollView className="flex-1 gap-10">
        {forecast.map((day, index) => (
          <HStack key={index} className="justify-between items-center">
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
                  alt="Sunny Cloud"
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
        ))}
      </ScrollView>
    </VStack>
  );
};
