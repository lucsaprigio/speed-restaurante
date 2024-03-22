import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function ShowSale() {

    function handleGoBack() {
        return router.back();
    };

    return (
        <SafeAreaView className="flex py-4 px-3 mb-4 gap-3 bg-blue-950">
            <View className="items-center">
                <Text className="text-2xl text-gray-200 font-heading">Novo pedido</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
                <TouchableOpacity activeOpacity={0.5} onPress={handleGoBack}>
                    <Feather name="chevron-left" size={28} color={colors.gray[200]} />
                </TouchableOpacity>
                <Text className="text-gray-200">
                    Mesa
                </Text>
                <View>
                </View>
            </View>
        </SafeAreaView>
    )
}