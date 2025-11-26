import { Link } from 'expo-router';
import { Text, View, YStack } from 'tamagui';

export default function ModalScreen() {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="$5"
      backgroundColor="$background"
    >
      <YStack gap="$4" alignItems="center">
        <Text fontSize="$9" fontWeight="bold" color="$color">
          This is a modal
        </Text>
        <Link href="/" dismissTo>
          <Text
            fontSize="$4"
            color="$color"
            textDecorationLine="underline"
            paddingVertical="$4"
          >
            Go to home screen
          </Text>
        </Link>
      </YStack>
    </View>
  );
}
