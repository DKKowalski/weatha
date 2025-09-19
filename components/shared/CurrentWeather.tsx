import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Box } from "../ui/box";

interface CurrentWeatherProps {
  temperature?: string;
  condition?: string;
  weatherIcon?: any;
  alt?: string;
}

export function CurrentWeather({
  temperature,
  condition,
  weatherIcon,
  alt,
}: CurrentWeatherProps) {
  return (
    <VStack className="flex-[0.3] items-center justify-center mb-32">
      <Box className="h-72 w-72">
        <Image
          source={weatherIcon ?? require("@/assets/images/sunny-cloud.png")}
          alt={alt ?? "weather icon"}
          className="h-full w-full object-contain"
          size="md"
          resizeMode="contain"
        />
      </Box>

      <Text className="text-6xl font-bold">{temperature ?? "--°"}</Text>
      <Text className="text-typography-500 text-2xl">
        {condition ?? "No data"}
      </Text>
    </VStack>
  );
}
