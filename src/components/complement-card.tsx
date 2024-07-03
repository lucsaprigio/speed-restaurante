'use client'
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { useState } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";

type CardComplementsProps = TouchableOpacityProps & {
    id: string;
    complementDescription: string;
    quantity?: number;
    onAdd?: () => void;
    onRemove: () => void;
}

export function CardComplements({ complementDescription, id, onRemove, onAdd, quantity = 1 }: CardComplementsProps) {
    function itemRemoved() {
        return quantity = 0
    }

    function itemAdded() {
        return quantity = 1
    }

    return (
        <View key={id} className="flex flex-row items-center justify-between p-2 border-b-[1px] border-gray-400">
            <TouchableOpacity className={
                clsx("", quantity === 0 ? "opacity-100" : "opacity-20")}
                onPress={() => { onAdd(), itemAdded() }}
            >
                <MaterialIcons name="add-circle" size={28} color={colors.blue[950]} />
            </TouchableOpacity>
            <View className="flex justify-center">
                <Text className="text-md">{complementDescription}</Text>
            </View>
            <TouchableOpacity className={
                clsx("", quantity === 1 ? "opacity-100" : "opacity-20")}
                onPress={() => { onRemove }}
            >
                <MaterialIcons name="remove-circle" size={28} color={colors.blue[950]} />
            </TouchableOpacity>
        </View>
    )
}