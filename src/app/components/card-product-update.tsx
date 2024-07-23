import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";

type ProductProps = TouchableOpacityProps & {
    id?: string;
    title?: string;
    subtitle?: string;
    price?: string;
    quantity?: number;
    add?: () => void;
    remove?: () => void;
    action?: () => void;
}

export function ProductCardUpdate({ id, price, title, subtitle, quantity, add, remove, action }: ProductProps) {
    return (
        <View className="flex w-full h-20 px-2 flex-row items-center justify-between  border-b-[1px] border-gray-400">
            <View className="flex flex-row items-center" >
                <View className="flex items-start justify-center gap-1 p-1">
                    <Text className="text-lg text">{title}</Text>
                    <Text className="text-gray-500">{subtitle}</Text>
                    <Text className="text-md text-blue-800 font-bold">{price}</Text>
                </View>
            </View>
            <View>
                {
                    quantity !== 0 && (
                        <Text className="text-green-600">
                            {quantity} Adicionado(s) ao pedido!
                        </Text>
                    )}
            </View>
            <View className="flex flex-row gap-2">
                <TouchableOpacity onPress={remove} activeOpacity={0.7}>
                    <MaterialIcons name="remove-circle" size={32} color={colors.blue[950]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={add} activeOpacity={0.7}>
                    <MaterialIcons name="add-circle" size={32} color={colors.blue[950]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}