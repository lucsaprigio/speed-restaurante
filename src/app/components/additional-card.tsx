'use client'
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { useState } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";

type CardComplementsProps = TouchableOpacityProps & {
    id: string;
    additionalDescription: string;
    quantity: number;
    price?: string;
    onAdd: () => void;
    onRemove: () => void;
}

export function CardAdditional({ additionalDescription, id, onRemove, onAdd, price, quantity = 0 }: CardComplementsProps) {
    const [isSelected, setIsSelected] = useState(false);

    function itemAdded() {
        return setIsSelected(true);
    }

    function itemRemoved() {
        return setIsSelected(false);
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
                {
                    !isSelected ? (
                        <TouchableOpacity className={
                            clsx("")}
                            onPress={() => { onAdd(), itemAdded() }}
                        >
                            <MaterialIcons name="add" size={24} color={colors.blue[950]} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity className={
                            clsx("")}
                            onPress={() => { onRemove(), itemRemoved() }}
                        >
                            <MaterialIcons name="check-circle" size={24} color={colors.blue[950]} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}