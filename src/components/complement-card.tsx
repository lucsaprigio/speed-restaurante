import { Text, View, TouchableOpacityProps } from "react-native";

type CardComplementsProps = TouchableOpacityProps & {
    complementDescription: string;
}

export function CardComplements({ complementDescription, ...rest }: CardComplementsProps) {
    return (
        <View className="flex flex-row items-center justify-between px-4 border-b-[1px] border-gray-400">
            <View className="flex justify-center">
                <Text className="text-md text-gray-600">{complementDescription}</Text>
            </View>
        </View>
    )
}