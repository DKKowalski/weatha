import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon, SunIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background-0 p-2">
      <VStack className="flex-[0.1] mb-4">
        <HStack className="justify-between items-center">
          <VStack>
            <Text className={`font-bold text-5xl ${"text-typography-900"}`}>
              New York
            </Text>
            <Text className="text-typography-500 text-2xl">12:00</Text>
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
      <VStack className="flex-[0.3] items-center justify-center mb-32">
        <Box className="h-72 w-72">
          <Image
            source={require("@/assets/images/sunny-cloud.png")}
            alt="Sunny Cloud"
            className="h-full w-full object-contain"
            size="md"
            resizeMode="contain"
          />
        </Box>

        <Text className="text-6xl font-bold">20°C</Text>
        <Text className="text-typography-500 text-2xl">Sunny</Text>
      </VStack>

      <VStack className="flex-[0.6] rounded-xl bg-background-50 px-4">
        <Text className="text-typography-800 text-3xl mb-4 mt-10">
          This week
        </Text>
        <ScrollView className="flex-1 gap-10">
          <HStack className="justify-between items-center">
            <Text className="uppercase text-2xl text-typography-500 flex-[0.25]">
              Monday
            </Text>
            <HStack className="items-center gap-6 flex-[0.25]">
              <Text className="text-2xl font-bold">20 °</Text>
              <Text className="text-2xl text-typography-500 font-bold">
                10 °
              </Text>
            </HStack>
            <HStack className="items-center gap-2 flex-[0.5]">
              <Box className="h-20 w-20">
                <Image
                  source={require("@/assets/images/sunny-cloud.png")}
                  alt="Sunny Cloud"
                  className="h-full w-full"
                  size="md"
                  resizeMode="contain"
                />
              </Box>
              <Text className="text-typography-500 text-xl">Sunny</Text>
            </HStack>
          </HStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
