import { api } from "@/app/api/api";
import { useAuth } from "@/app/hooks/auth";
import { ProductCartProps, useCartStore } from "@/app/store/product-cart";
import { formatCurrency } from "@/app/utils/functions/formatCurrency";
import { Button } from "@/components/button";
import { ProductInCart } from "@/components/protuct-in-cart";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";
import { Alert, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function CloseUpdatedSale() {
    const { saleId, id, totalSale } = useLocalSearchParams();
    const { user } = useAuth();
    const cartStore = useCartStore();
    const router = useRouter();

    const total = formatCurrency(cartStore.products.map(item => item.total));
    const totalToBackend = cartStore.products.map(item => item.total);

    function handleGoBack() {
        return router.back();
    }

    function handleRemoveItem(product: ProductCartProps) {
        return cartStore.remove(product.CD_PRODUTO)
    }

    async function handleUpdateSale() {
        try {
            const provider = user.userId;

            await api.post(`/update-sale/${saleId}`, {
                tableId: id,
                obs: '',
                total: (Number(totalToBackend) + Number(totalSale)),
                userId: provider,
                launchs: cartStore.getProductsArray()
            });

        } catch (err) {
            Alert.alert('Algo deu errado', 'Ocorreu um erro, Tente novamente.');
            console.log(err);
        }
    }

    function handleCloseSale() {
        Alert.alert("Atualizar Pedido", 'Deseja atualizar o pedido?', [
            {
                text: "Cancelar"
            },
            {
                text: "Atualizar Pedido",
                onPress: () => {
                    handleUpdateSale();
                    cartStore.clear();
                    router.push('/(auth-routes)/');
                }
            }
        ]
        )
    }

    return (
        <>
            <SafeAreaView className="flex p-10 bg-blue-950 flex-row items-center justify-between gap-10">
                <TouchableOpacity onPress={handleGoBack}>
                    <Feather name="chevron-left" size={28} color={colors.gray[100]} />
                </TouchableOpacity>
                <Text className="text-gray-100 text-2xl font-bold">
                    Detalhes do Pedido
                </Text>
                <View></View>
            </SafeAreaView>
            <ScrollView>
                <Text className="text-lg text-center font-heading text-blue-950 mt-3">Mesa {id ? id : "não selecionada"}</Text>
                {
                    cartStore.products.map((item) => (
                        <ProductInCart
                            key={item.CD_PRODUTO}
                            title={`${item.DESCRICAO_PRODUTO}`}
                            subtitle={`${item.DESCRICAO_PRODUTO}`}
                            price={formatCurrency(item.VR_UNITARIO)}
                            quantity={item.quantity}
                            additional={item.additional}
                            obs={item.obs}
                            total={formatCurrency(item.total)}
                            onPress={() => handleRemoveItem(item)}
                        />
                    ))
                }
            </ScrollView>
            <View className="fixed p-4 bg-gray-300">
                <View className="flex items-start gap-3">
                    <Text className="text-lg font-subtitle">Total:</Text>
                    <Text className="text-green-700 text-2xl font-bold my-2">{total}</Text>
                </View>
                <Button onPress={handleCloseSale}>
                    <Button.Text>
                        Atualizar pedido
                    </Button.Text>
                </Button>
            </View>
        </>
    )
}