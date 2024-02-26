import { ProductDTO } from "@/DTO/ProductDTO";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

type ProductProps = {
    title?: string;
    subtitle?: string;
    price?: string;
}

export function Product({ price, title, subtitle }: ProductProps) {
    const [quantity, setQuantity] = useState(0);

    function addProduct() {
        return setQuantity(quantity + 1)
    }

    function removeProduct() {
        if (quantity <= 0) {
            return null
        } else {
            return setQuantity(quantity - 1)
        }
    }

    return (
        <View className="flex w-full h-20 px-3 flex-row my-2 items-center justify-between  border-b-[1px] border-gray-400">
            <View className="flex flex-row items-center">
                <View className="flex items-center justify-start gap-1 p-3">
                    <Text className="text-lg">{title}</Text>
                    <Text className="text-gray-500">{subtitle}</Text>
                    <Text className="text-md text-blue-800 font-bold">{price}</Text>
                </View>
            </View>
            <View className="flex flex-row items-center justify-center gap-2 ">
                <TouchableOpacity onPress={removeProduct}>
                    <MaterialIcons name="remove-circle" size={32} color={colors.blue[950]} />
                </TouchableOpacity>
                <Text>{quantity}</Text>
                <TouchableOpacity onPress={addProduct}>
                    <MaterialIcons name="add-circle" size={32} color={colors.blue[950]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}