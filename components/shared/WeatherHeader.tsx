import { HStack } from "@/components/ui/hstack";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useTheme } from "@/context/theme";
import { Pressable } from "react-native";

interface WeatherHeaderProps {
  location: string;
  dateTime: string;
}

export function WeatherHeader({ location, dateTime }: WeatherHeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <VStack className="flex-[0.1] mb-4">
      <HStack className="justify-between items-center">
        <VStack>
          <Text
            className={`font-bold text-5xl ${
              theme === "dark" ? "text-typography-100" : "text-typography-900"
            }`}
          >
            {location}
          </Text>
          <Text className="text-typography-500 text-2xl">{dateTime}</Text>
        </VStack>

        <Pressable onPress={toggleTheme}>
          <Icon
            as={theme === "dark" ? SunIcon : MoonIcon}
            size="xl"
            className="text-typography-500 w-10 h-10"
          />
        </Pressable>
      </HStack>
    </VStack>
  );
}
