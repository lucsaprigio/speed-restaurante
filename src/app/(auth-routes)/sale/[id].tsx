import { FlatList, Text, TouchableOpacity, useAnimatedValue } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Product } from "../../components/product";
import { CategoryButton } from "../../components/category-button";
import { useCartStore } from "../../store/product-cart";
import { SaleCart } from "../../components/sale-cart";
import { formatCurrency } from "../../utils/functions/formatCurrency";
import { api } from "../../api/api";
import { ProductList } from "../../../DTO/ProductDTO";
import { Category } from "../../../DTO/CategoryDTO";
import { useAuth } from "@/app/hooks/auth";

export default function Sale() {
    const router = useRouter();
    const cartStore = useCartStore();
    const { id } = useLocalSearchParams();
    const { config } = useAuth();

    const [lastSaleId, setLastSaleId] = useState<Number | any>();
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [productList, setProductList] = useState<ProductList[]>([]);

    const [filteredProducts, setFilteredProducts] = useState<ProductList[]>([]);

    async function handleListProducts() {
        try {
            const [productsResponse, categoriesResponse] = await Promise.all([
                api.get(`${config.ipConnection}/products`),
                api.get(`${config.ipConnection}/categories`)
            ]);

            setProductList(productsResponse.data.products);
            setCategoryList(categoriesResponse.data);
        } catch (err) {
            console.log(err);
        }
    }

    function handleGoBack() {
        return router.back();
    };

    function handleEditProduct(id: string) {
        router.push(`/product/${id}`)
    };

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory);

        const productsFiltered = productList.filter(product => selectedCategory === product.DESCRICAO_CATEGORIA);

        setFilteredProducts(productsFiltered);
    };


    function handleCloseSale(saleId: string, id: string | any) {
        router.push({ pathname: `/sale/close-sale/`, params: { saleId, id } });
    };

    useEffect(() => {
        setFilteredProducts(productList);
        handleListProducts();
    }, []);

    return (
        <>
            <SafeAreaView className="flex py-4 px-3 mb-4 gap-3 bg-blue-950">
                <View className="items-center">
                    <Text className="text-2xl text-gray-200 font-heading">Novo pedido</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity activeOpacity={0.5} onPress={handleGoBack}>
                        <Feather name="chevron-left" size={28} color={colors.gray[200]} />
                    </TouchableOpacity>
                    <Text className="text-gray-200">
                        Mesa {Number(id) > 0 ? id : "não selecionada"}
                    </Text>
                    <View>
                        <SaleCart quantity={cartStore.products.length} onPress={() => { handleCloseSale(lastSaleId, id) }} />
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
                data={filteredProducts}
                keyExtractor={(product) => product.CD_PRODUTO}
                renderItem={(product) => {
                    const productInCart = cartStore.products.find(cartItem => cartItem.CD_PRODUTO === product.item.CD_PRODUTO);
                    const quantityInCart = productInCart ? productInCart.quantity : 0;
                    return (
                        <Product
                            title={product.item.DESCRICAO_PRODUTO.toUpperCase()}
                            subtitle={product.item.DESCRICAO_PRODUTO.toUpperCase()}
                            price={formatCurrency(product.item.VR_UNITARIO)}
                            action={() => handleEditProduct(product.item.CD_PRODUTO)}
                            quantity={quantityInCart} />
                    )
                }
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </>
    )
}