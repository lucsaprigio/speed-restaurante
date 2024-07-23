import { api } from "@/app/api/api";
import { formatCurrency } from "@/app/utils/functions/formatCurrency";
import { Button } from "@/app/components/button";
import { ProductLaunchList } from "@/DTO/ProductDTO";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function ShowSale() {
    const { id, saleId } = useLocalSearchParams();
    const [saleLaunch, setSaleLaunch] = useState<ProductLaunchList[]>([]);
    const [total, setTotal] = useState(0);

    function handleGoBack() {
        return router.back();
    };

    function handleUpdateSale(id: string, saleId: string) {
        return router.push({ pathname: `/sale/update-sale/${id}`, params: { saleId, totalSale: total } })
    }

    async function handleGetSale() {
        try {
            const response = await api.get(`/sale/${saleId}`);

            setTotal(response.data[0].TOTAL);
            setSaleLaunch(response.data);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        handleGetSale()
    }, []);

    return (
        <>
            <SafeAreaView className="flex py-4 px-3 mb-4 gap-3 bg-blue-950">
                <View className="items-center">
                    <Text className="text-2xl text-gray-200 font-heading">Pedido Nº {saleId}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity activeOpacity={0.5} onPress={handleGoBack}>
                        <Feather name="chevron-left" size={28} color={colors.gray[200]} />
                    </TouchableOpacity>
                    <Text className="text-gray-200">
                        Mesa {Number(id) > 0 ? id : "não selecionada"}
                    </Text>
                    <View>
                    </View>
                </View>
            </SafeAreaView>
            <ScrollView>
                {
                    saleLaunch.map((product) => (
                        <View className="bg-gray-200 p-3 space-y-1 my-2" key={product.CD_PRODUTO}>
                            <Text className="text-xl font-subtitle">{product.DESCRICAO_PRODUTO}</Text>
                            <Text className="text-gray-500">{product.OBS_PRODUTO || 'Sem observação'}</Text>
                            <Text className="text-gray-500">{product.ADICIONAL_PRODUTO || ''}</Text>
                            <Text className="text-blue-950 font-bold">Qtd. {product.QTD_PRODUTO || 0}</Text>
                            <Text className="text-lg">Valor: R$ {product.UNIT_PRODUTO.toFixed(2) || 0}</Text>
                            <Text className="text-lg font-bold text-blue-950">Total: R$ {product.TOTAL_PRODUTO.toFixed(2) || 0}</Text>
                            {
                                product.STATUS_LANCA !== 'P' ? (
                                    <Text className="text-zinc-600">
                                        Em produção
                                    </Text>) : (
                                    <Text className="text-green-500">
                                        Pronto
                                    </Text>
                                )
                            }
                        </View>
                    ))
                }
            </ScrollView>
            <View className="fixed bottom-0 p-3 bg-gray-100">
                <View className="text-lg py-3">
                    <Text className="font-bold text-green-900">Total do Pedido: {formatCurrency(total) || 0}</Text>
                </View>
                <Button onPress={() => handleUpdateSale(id as string, saleId as string)}>
                    <Button.Text>
                        Adicionar ao pedido
                    </Button.Text>
                    <Button.Icon>
                        <MaterialIcons name="add-circle" size={24} color={colors.gray[50]} />
                    </Button.Icon>
                </Button>
                <View className="my-2">
                    <Button onPress={() => handleUpdateSale(id as string, saleId as string)}>
                        <Button.Text>
                            Fechar pedido
                        </Button.Text>
                        <Button.Icon>
                            <MaterialIcons name="check" size={24} color={colors.gray[50]} />
                        </Button.Icon>
                    </Button>
                </View>
            </View>
        </>
    )
}