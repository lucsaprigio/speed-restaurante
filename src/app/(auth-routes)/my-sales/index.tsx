import { api } from "@/app/api/api";
import { useAuth } from "@/app/hooks/auth";
import { UserSalesCard } from "@/components/user-sales-card";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function MySales() {
    const { user } = useAuth();

    async function handleGetSales() {
        try {
            const response = await api.get(`my-sales/1`);

            console.log(response.data);
        } catch (err) {

        }
    }

    function handleGoBack() {
        return router.back();
    }

    useEffect(() => {
        handleGetSales()
    }, []);

    return (
        <>
            <View>
                <SafeAreaView className="flex flex-row p-10 items-center justify-between w-full bg-blue-950">
                    <TouchableOpacity>
                        <Feather name="chevron-left" size={24} color={colors.gray[50]} onPress={handleGoBack} />
                    </TouchableOpacity>
                    <Text className="text-gray-50 text-2xl">Meus pedidos</Text>
                    <View></View>
                </SafeAreaView>
            </View>
            <View className="p-3">
                <UserSalesCard
                    saleId="1"
                    tableId="2"
                    closed="N"
                    total="10.00"
                />
            </View>
        </>
    )
}