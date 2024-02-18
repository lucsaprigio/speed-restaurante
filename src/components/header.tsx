import { Text, View } from "react-native";

type HeaderProps = {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <View className="flex-1">
            <Text className="text-2xl font-bold">
                {title}
            </Text>
        </View>
    )
}