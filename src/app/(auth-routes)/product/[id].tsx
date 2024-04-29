import { ProductList } from "@/DTO/ProductDTO";
import { api } from "@/app/api/api";
import { ProductCartProps, useCartStore } from "@/app/store/product-cart";
import { products } from "@/app/utils/data/products";
import { formatCurrency } from "@/app/utils/functions/formatCurrency";
import { Button } from "@/components/button";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "tailwindcss/colors";

export default function Product() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const cartStore = useCartStore();

    const [product, setProduct] = useState<ProductList>({} as ProductList);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    async function handleShowProduct() {
        try {
            const response = await api.get(`/product/${id}`);

            setProduct(response.data.product);
        } catch (err) {
            console.log(err);
        }
    }

    function handleGoBack() {
        return navigation.goBack();
    }

    function handleAddQuantityProduct() {
        setQuantity(prevQuantity => prevQuantity + 1);
        setTotal(Number(product?.VR_UNITARIO) * quantity);
    }

    function handleRemoveQuantityProduct() {
        setQuantity(prevQuantity => prevQuantity > 0 ? prevQuantity - 1 : 0);
        setTotal(Number(product?.VR_UNITARIO) * quantity);
    }

    function handleAddToCart() {
        if (product) {
            cartStore.add(product as ProductCartProps, quantity);
            console.log({ ...product, quantity })
            navigation.goBack();
        }
    }

    useEffect(() => {
        setTotal(Number(product?.VR_UNITARIO) * quantity);

        handleShowProduct();
    }, [product, quantity]);

    return (
        <>
            <ScrollView>
                <SafeAreaView className="flex flex-row p-10 items-center justify-between w-full bg-blue-950">
                    <TouchableOpacity>
                        <Feather name="chevron-left" size={24} color={colors.gray[50]} onPress={handleGoBack} />
                    </TouchableOpacity>
                    <Text className="text-gray-50 text-2xl">{product?.DESCRICAO_PRODUTO}</Text>
                    <View></View>
                </SafeAreaView>
                <View className="flex-1 items-start border-b-[1px] border-gray-400 p-3 space-y-3" >
                    <Text className="text-lg mt-5">
                        {product?.DESCRICAO_PRODUTO}
                    </Text>
                    <Text>
                        {product.SUBDESCRICAO}
                    </Text>
                    <Text className="text-gray-500 font-heading">
                        R$ {product.VR_UNITARIO}
                    </Text>
                </View>

                <View className="flex-1 items-start border-b-[1px] border-gray-400 space-y-3 p-3">
                    <Text>Complementos</Text>
{/*                     <FlatList 
                        data={}
                    /> */}
                </View>

                <View className="flex-1 items-start justify-center p-3">
                    <Text className="my-3"> <Feather name="paperclip" color={colors.gray[500]} />Observações:</Text>
                    <TextInput className="w-full p-1 border-blue-950 border-[1px] h-36 rounded-md" multiline />
                </View>


            </ScrollView>
            <View className="fixed flex-1 flex-row bottom-0 bg-gray-200 py-5">
                <View className="flex flex-row items-center justify-center gap-3">
                    <TouchableOpacity onPress={handleRemoveQuantityProduct}>
                        <MaterialIcons size={32} name="remove" color={colors.blue[950]} />
                    </TouchableOpacity>
                    <Text>
                        {quantity}
                    </Text>
                    <TouchableOpacity onPress={handleAddQuantityProduct}>
                        <MaterialIcons size={32} name="add" color={colors.blue[950]} />
                    </TouchableOpacity>
                </View>
                <View className="items-center justify-center px-8">
                    <Button onPress={handleAddToCart}>
                        <Button.Text>
                            Adicionar R$ {total.toFixed(2)}
                        </Button.Text>

                        <Button.Icon>
                            <Feather name="check" size={24} color={colors.gray[100]} />
                        </Button.Icon>
                    </Button>
                </View>
            </View>
        </>
    )
}