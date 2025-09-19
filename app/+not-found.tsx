import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView className="flex-1 bg-background-0">
        <VStack
          className="flex-1 justify-center items-center px-6 py-8"
          space="lg"
        >
          <Image
            source={require("@/assets/images/404.png")}
            alt="404 Not Found"
            className="w-48 h-48"
            accessibilityRole="image"
          />

          <VStack space="md" className="items-center">
            <Text className="text-2xl font-bold text-center">
              Page Not Found
            </Text>
            <Text className="text-base text-center text-typography-500">
              The page you&apos;re looking for doesn&apos;t exist.
            </Text>
          </VStack>

          <Link href="/" asChild>
            <Button variant="solid" action="primary">
              <Text className="text-white font-semibold">Go Home</Text>
            </Button>
          </Link>
        </VStack>
      </SafeAreaView>
    </>
  );
}
