import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";

type SaleCartProps = TouchableOpacityProps & {
    quantity: number;
}

export function SaleCart({ quantity, ...rest }: SaleCartProps) {
    return (
        (
            quantity > 0 &&
            <TouchableOpacity className="relative" activeOpacity={0.7} {...rest}>
                <View className="bg-red-400 w-4 h-4 rounded-full flex items-center justify-center top-2 z-10 -right-3.5">
                    <Text className="text-slate-900 font-bold text-xs">
                        {quantity}
                    </Text>
                </View>

                <MaterialIcons name="menu-book" color={colors.white} size={24} />
            </TouchableOpacity>
        )
    )
}