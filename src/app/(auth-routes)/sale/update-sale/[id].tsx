import { Alert, FlatList, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Product } from "../../../../components/product";
import { CategoryButton } from "../../../../components/category-button";
import { ProductCartProps, useCartStore } from "@/app/store/product-cart";
import { SaleCart } from "@/components/sale-cart";
import { formatCurrency } from "@/app/utils/functions/formatCurrency";
import { api } from "@/app/api/api";
import { ProductList } from "@/DTO/ProductDTO";
import { Loading } from "@/components/loading";
import { Category } from "@/DTO/CategoryDTO";
import { ProductCardUpdate } from "@/components/card-product-update";
import { Button } from "@/components/button";

export default function UpdateSale() {
    const router = useRouter();
    const cartStore = useCartStore();
    const { id, saleId, totalSale } = useLocalSearchParams();

    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [productList, setProductList] = useState<ProductList[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductList[]>([]);


    const totalCart = Number(totalSale);
    const totalToBackend = cartStore.products.reduce((total, product) => totalCart + total + product.VR_UNITARIO * product.quantity, 0);

    async function handleListProducts() {
        try {
            const response = await api.get('/products');

            setProductList(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleListCategories() {
        try {
            const response = await api.get('/categories');

            setCategoryList(response.data);
        } catch (err) {
            console.log(err);

        }
    };


    function handleAddToCart(CD_PRODUTO: string, CD_CATEGORIA: string, DESCRICAO_CATEGORIA: string, DESCRICAO_PRODUTO: string, VR_UNITARIO: number, quantity: number) {
        cartStore.add({ CD_PRODUTO, CD_CATEGORIA, DESCRICAO_CATEGORIA, DESCRICAO_PRODUTO, VR_UNITARIO, quantity }, quantity);
    }


    function handleGoBack() {
        return router.back();
    };

    function handleRemoveItem(CD_PRODUTO: string) {
        return cartStore.remove(CD_PRODUTO)
    }

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory);

        const productsFiltered = productList.filter(product => selectedCategory === product.DESCRICAO_CATEGORIA);

        setFilteredProducts(productsFiltered);
    };

    async function handleUpdateSale() {
        try {
            console.log(saleId);
            await api.post(`/update-sale/${saleId}`, {
                tableId: id,
                obs: '',
                closed: 'N',
                total: totalToBackend,
                launchs: cartStore.getProductsArray()
            });
        } catch (err) {
            console.log(err)
        }
    }


    function handleCloseSale() {
        Alert.alert("Atualizar pedido", 'Deseja atualizar o pedido?', [
            {
                text: "Cancelar"
            },
            {
                text: "Atualizar",
                onPress: () => {
                    // Aqui vai as funções da rota que vou criar
                    handleUpdateSale();
                    cartStore.clear();
                    router.push('/(auth-routes)/');
                }
            }
        ]
        )
    }

    useEffect(() => {
        setFilteredProducts(productList);
        handleListProducts();
        handleListCategories();
    }, []);

    return (
        <>
            <SafeAreaView className="flex py-4 px-3 mb-4 gap-3 bg-blue-950">
                <View className="items-center">
                    <Text className="text-2xl text-gray-200 font-heading">Atualizar pedido Nº {saleId}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity activeOpacity={0.5} onPress={handleGoBack}>
                        <Feather name="chevron-left" size={28} color={colors.gray[200]} />
                    </TouchableOpacity>
                    <Text className="text-gray-200">
                        Mesa {id}
                    </Text>
                    <View>

                    </View>
                </View>
            </SafeAreaView>
            <View className="flex w-full px-2 py-2 mb-10 items-center justify-center border-[1px]">
                <FlatList
                    data={categoryList}
                    keyExtractor={(item) => item.CD_CATEGORIA}
                    renderItem={({ item }) => (
                        <CategoryButton
                            title={item.DESCRICAO_CATEGORIA}
                            isSelected={item.DESCRICAO_CATEGORIA === category}
                            onPress={() => { handleCategorySelect(item.DESCRICAO_CATEGORIA) }}
                        />
                    )}
                    horizontal
                    className="max-h-10"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
                />
            </View>

            <View className="m-1 flex items-start">
                {category &&
                    <TouchableOpacity
                        className="flex flex-row items-center justify-center bg-gray-500 p-2 rounded-md"
                        activeOpacity={0.7} onPress={() => {
                            setFilteredProducts(productList)
                            setCategory('')
                        }}>
                        <Text className="text-gray-100">
                            {category}
                        </Text>
                        <Feather size={16} name="x" color={colors.gray[100]} />
                    </TouchableOpacity>
                }
            </View>
            <Text className="mx-5 border-b-[1px] text-gray-400 border-gray-400">Produtos</Text>
            <FlatList
                className="flex-1 p-5"
                data={filteredProducts && productList}
                keyExtractor={(product) => product.CD_PRODUTO}
                renderItem={(product) => {
                    const productInCart = cartStore.products.find(cartItem => cartItem.CD_PRODUTO === product.item.CD_PRODUTO);
                    const quantityInCart = productInCart ? productInCart.quantity : 0;
                    return (
                        <ProductCardUpdate
                            title={product.item.DESCRICAO_PRODUTO}
                            subtitle={product.item.DESCRICAO_PRODUTO}
                            price={formatCurrency(product.item.VR_UNITARIO)}
                            add={() => {
                                handleAddToCart(
                                    product.item.CD_PRODUTO,
                                    product.item.CD_CATEGORIA,
                                    product.item.DESCRICAO_CATEGORIA,
                                    product.item.DESCRICAO_PRODUTO,
                                    product.item.VR_UNITARIO,
                                    1
                                )
                            }}
                            remove={() => {
                                handleRemoveItem(product.item.CD_PRODUTO)
                            }}
                            quantity={quantityInCart}
                        />
                    )
                }
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            {
                cartStore.products.length > 0 && (
                    <View className="fixed bottom-0 p-3">
                        <Button onPress={handleCloseSale}>
                            <Button.Text>
                                Atualizar pedido
                            </Button.Text>
                            <Button.Icon>
                                <MaterialIcons name="edit" color={colors.gray[50]} size={24} />
                            </Button.Icon>
                        </Button>
                    </View>
                )
            }
        </>
    )
}