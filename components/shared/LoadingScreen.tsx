import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex-1 justify-center items-center px-4 py-8 bg-background-0">
      <VStack space="lg" className="items-center">
        <Box className="h-72 w-72">
          <Image
            source={require("@/assets/images/sunny-cloud.png")}
            alt="Weather loading icon"
            className="w-full h-full object-contain"
            accessibilityRole="image"
          />
        </Box>

        <Spinner size="large" className="text-primary-500" />
        {children ? (
          children
        ) : (
          <Text className="text-foreground-500 text-center">
            Fetching weather data...
          </Text>
        )}
      </VStack>
    </Box>
  );
}
