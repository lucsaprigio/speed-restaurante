import { api } from "@/app/api/api";
import { useAuth } from "@/app/hooks/auth";
import { UserSalesCard } from "@/components/user-sales-card";
import { SaleDTO } from "@/DTO/SaleDTO";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function MySales() {
    const { user } = useAuth();

    const [sales, setSales] = useState<SaleDTO[]>([]);

    async function handleGetSales() {
        try {
            const response = await api.get(`my-sales/${user.userId}`);

            setSales(response.data.sales);
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
            <ScrollView className="p-3 space-y-6">
                {
                    sales && sales.map((sale) => (
                        <UserSalesCard
                            key={sale.CD_PEDIDO}
                            saleId={sale.CD_PEDIDO}
                            tableId={sale.CD_MESA}
                            closed={sale.FECHADO}
                            total={sale.TOTAL.toFixed(2)}
                            obs={sale.OBS}
                        />
                    ))
                }
            </ScrollView>
        </>
    )
}