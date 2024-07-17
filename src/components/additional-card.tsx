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
        return setQuantity(0)
    }

    function itemAdded() {
        return setQuantity(1)
    }

    return (
        <View
            key={id}
            className="flex-1 flex-row items-center justify-between border-b-[1px] border-gray-400">
            <View className="flex flex-row items-center justify-start w-full">
                <Text className="text-md text-left">{additionalDescription}</Text>
                <Text className="text-blue-800">R$ {price}</Text>
            </View>

            <View className="flex flex-row w-full">
                <TouchableOpacity className={
                    clsx("border-[1px] border-blue-950 rounder-sm", quantity >= 1 ? "opacity-100" : "opacity-0")}
                    disabled={quantity === 0}
                    onPress={() => { onRemove(), itemRemoved() }}
                >
                    <MaterialIcons name="remove" size={18} color={colors.blue[950]} />
                </TouchableOpacity>
                {quantity > 0 && <Text className="border-y-[1px] border-blue-950 rounder-sm">{quantity}</Text>}
                <TouchableOpacity className={
                    clsx("border-[1px] border-blue-950 rounder-sm", quantity === 0 ? "opacity-100" : "opacity-20")}
                    onPress={() => { onAdd(), itemAdded() }}
                    disabled={quantity === 1}
                >
                    <MaterialIcons name="add" size={18} color={colors.blue[950]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}