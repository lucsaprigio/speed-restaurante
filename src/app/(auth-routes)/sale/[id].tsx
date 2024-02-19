import { Text, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Button } from "@/components/button";

export default function Sale() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [saleId, setSaleId] = useState('');

    function handleGoBack() {
        return router.back();
    }

    useEffect(() => {
        setSaleId(id.toString())
    }, []);

    return (
        <>
            <SafeAreaView className="flex py-4 px-3 mb-4 gap-3 bg-blue-950">
                <View className="items-center">
                    <Text className="text-2xl text-gray-200 font-heading">Novo Pedido</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity activeOpacity={0.5} onPress={handleGoBack}>
                        <Feather name="chevron-left" size={28} color={colors.gray[200]} />
                    </TouchableOpacity>
                    <Text className="text-gray-200">
                        Mesa {saleId}
                    </Text>
                    <View></View>
                </View>
            </SafeAreaView>
            <View className="w-full m-3 px-6 items-center justify-center">
                <View className="flex w-full gap-2 justify-start rounded-md shadow-2xl bg-gray-200">
                    <Text className="font-bold  text-lg p-3">Pedido nº 1</Text>
                </View>
            </View>
        </>
    )
}