import { api } from "../../../api/api";
import { useAuth } from "../../../hooks/auth";
import { ProductCartProps, useCartStore } from "../../../store/product-cart";
import { formatCurrency } from "../../../utils/functions/formatCurrency";
import { Button } from "../../../components/button";
import { ProductInCart } from "../../../components/protuct-in-cart";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";
import { Alert, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function CloseSale() {
    const { id, saleId } = useLocalSearchParams();
    const { user, config } = useAuth();
    const cartStore = useCartStore();
    const router = useRouter();

    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.VR_UNITARIO * product.quantity, 0));
    const totalToBackend = cartStore.products.reduce((total, product) => total + product.VR_UNITARIO * product.quantity, 0);

    function handleGoBack() {
        return router.back();
    }

    function handleRemoveItem(product: ProductCartProps) {
        return cartStore.remove(product.CD_PRODUTO)
    }

    async function handleCreateSale() {
        try {
            const provider = user.userId;

            if (Number(id) > 0) {
                await api.post(`${config.ipConnection}/new-sale`, {
                    tableId: id,
                    obs: '',
                    total: totalToBackend,
                    userId: provider,
                    launchs: cartStore.getProductsArray()
                });
            } else {
                await api.post(`${config.ipConnection}/new-sale`, {
                    tableId: null,
                    obs: '',
                    total: totalToBackend,
                    userId: provider,
                    launchs: cartStore.getProductsArray()
                });
            }


            const cartToText = cartStore.getProductsArray().map((item) => [
                item.productDescription, '   ',
                'Qtd. ' + item.quantity, '   ',
                formatCurrency(item.totalProduct), '   ', '\n',
                item.obsProduct, '\n',
            ]);

            const formattedCartToText = cartToText.map(row => row.join('')).join('\n');

            const text = `\nPEDIDO Nº 1\nMESA      1 \n${formattedCartToText}\nTOTAL\n${total}\n
            \n
        `;

            await api.post(`${config.ipConnection}/print-sale`, { saleDetails: text });

            cartStore.clear();
        } catch (err) {
            Alert.alert('Algo deu errado', 'Ocorreu um erro, Tente novamente.');
            console.log(err);
        }
    }

    function handleCloseSale() {
        Alert.alert("Fechamento", 'Enviar à Cozinha?', [
            {
                text: "Cancelar"
            },
            {
                text: "Fechar Pedido",
                onPress: () => {
                    handleCreateSale();
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
                <Text className="text-lg text-center font-heading text-blue-950 mt-3">Mesa {Number(id) > 0 ? id : "não selecionada"}</Text>
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
                        Enviar para Cozinha
                    </Button.Text>
                </Button>
            </View>
        </>
    )
}