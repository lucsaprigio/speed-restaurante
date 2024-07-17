'use client'
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { useState } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";

type CardComplementsProps = TouchableOpacityProps & {
    id: string;
    additionalDescription: string;
    quantity?: number;
    price?: string;
    onAdd: () => void;
    onRemove: () => void;
}

export function CardAdditional({ additionalDescription, id, onRemove, onAdd, price }: CardComplementsProps) {
    const [quantity, setQuantity] = useState(0);

    function itemRemoved() {
        return setQuantity(quantity - 1);
    }

    function itemAdded() {
        return setQuantity(quantity + 1);
    }

    return (
        <View
            key={id}
            className="flex flex-row items-center justify-between w-full border-b-[1px] border-gray-400">
            <View className="flex flex-row items-center justify-start gap-3">
                <Text className="text-md text-left">{additionalDescription}</Text>
                <Text className="text-left text-blue-800">R$ {price}</Text>
            </View>

            <View className="flex flex-row p-3">
                <TouchableOpacity className={
                    clsx("border-[1px] border-blue-950 rounder-sm", quantity >= 1 ? "opacity-100" : "opacity-0")}
                    disabled={quantity === 0}
                    onPress={() => { onRemove(), itemRemoved() }}
                >
                    <MaterialIcons name="remove" size={18} color={colors.blue[950]} />
                </TouchableOpacity>
                {quantity > 0 && <Text className="px-2 border-y-[1px] border-blue-950 rounder-sm">{quantity}</Text>}
                <TouchableOpacity className={
                    clsx("border-[1px] border-blue-950 rounder-sm")}
                    onPress={() => { onAdd(), itemAdded() }}
                >
                    <MaterialIcons name="add" size={18} color={colors.blue[950]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}