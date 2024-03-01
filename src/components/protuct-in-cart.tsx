import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

type ProductInCartProps = TouchableOpacityProps & {
    title: string;
    subtitle: string;
    price: number;
    total: number;
    quantity: number;
}

export function ProductInCart({ price, quantity, subtitle, title, total, ...rest }: ProductInCartProps) {
    return (
        <View className="flex flex-row items-center justify-between px-4 border-b-[1px] border-gray-400">
            <View className="flex justify-center">
                <Text className="text-blue-800 text-lg font-subtitle">{title}</Text>
                <Text className="text-md text-gray-600">{subtitle}</Text>
                <View className="flex flex-row gap-3">
                    <Text className="text-md text-blue-800">Qtd. {quantity}</Text>
                    <Text className="text-blue-800 font-subtitle">{price}</Text>
                </View>
                <View className="flex flex-row items-center gap-3 my-1">
                    <Text className="text-lg text-green-600 font-subtitle">{total}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity {...rest}>
                    <MaterialIcons name="remove-circle" size={32} color={colors.blue[950]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}