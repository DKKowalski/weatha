import { HStack } from "@/components/ui/hstack";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "react-native";

interface WeatherHeaderProps {
  location: string;
  dateTime: string;
}

export function WeatherHeader({ location, dateTime }: WeatherHeaderProps) {
  return (
    <VStack className="flex-[0.1] mb-4">
      <HStack className="justify-between items-center">
        <VStack>
          <Text className={`font-bold text-5xl ${"text-typography-900"}`}>
            {location}
          </Text>
          <Text className="text-typography-500 text-2xl">{dateTime}</Text>
        </VStack>

        <Pressable onPress={() => {}}>
          <Icon
            as={SunIcon}
            size="xl"
            className="text-typography-500 w-10 h-10"
          />
        </Pressable>
      </HStack>
    </VStack>
  );
}