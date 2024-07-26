import { api } from "../../api/api";
import { useAuth } from "../../hooks/auth";
import { UserSalesCard } from "../../components/user-sales-card";
import { SaleDTO } from "../../../DTO/SaleDTO";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from 'date-fns';
import colors from "tailwindcss/colors";

export default function MySales() {
    const { user, config } = useAuth();

    const [sales, setSales] = useState<SaleDTO[]>([]);

    async function handleGetSales() {
        try {
            const response = await api.get(`${config.ipConnection}/my-sales/${user.userId}`);

            setSales(response.data.sales);
        } catch (err) {
            Alert.alert('Ocorreu um erro inesperado ❌', `${err}`);
        }
    }

    function handleOpenSale(id: string, saleId: string) {
        return router.push({
            pathname: `/(auth-routes)/show-sale/${id}`,
            params: { saleId }
        })
    };

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
                            onPress={() => handleOpenSale(sale.CD_MESA, sale.CD_PEDIDO)}
                            key={sale.CD_PEDIDO}
                            saleId={sale.CD_PEDIDO}
                            tableId={sale.CD_MESA}
                            closed={sale.FECHADO}
                            total={sale.TOTAL.toFixed(2)}
                            obs={sale.OBS}
                            created_at={format(new Date(sale.DTA_TRANS), 'HH:mm - dd/MM/yyyy')}
                        />
                    ))
                }
            </ScrollView>
        </>
    )
}