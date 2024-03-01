import { FlatList, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Product } from "../../../components/product";
import { CategoryButton } from "../../../components/category-button";
import { ProductProps, products } from "@/app/utils/data/products";
import { categories } from "@/app/utils/data/categories";
import { useCartStore } from "@/app/store/product-cart";
import { SaleCart } from "@/components/sale-cart";
import { formatCurrency } from "@/app/utils/functions/formatCurrency";

export default function Sale() {
    const router = useRouter();
    const cartStore = useCartStore();
    const { id } = useLocalSearchParams();

    const sales = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        },
        {
            id: 5,
        },
    ]

    const [saleId, setSaleId] = useState('');
    const [lastSaleId, setLastSaleId] = useState<Number | any>();
    const [category, setCategory] = useState('');
    const [productList, setProductList] = useState<ProductProps[]>([]);

    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

    function handleGoBack() {
        return router.back();
    }

    function handleEditProduct(id: string) {
        router.push(`/product/${id}`)
    }

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory);

        const productsFiltered = productList.filter(product => selectedCategory === product.category);
        console.log(productsFiltered)

        setFilteredProducts(productsFiltered);
    }

    function handleGetLastSaleId() {
        const lastSale = sales[sales.length - 1];

        setLastSaleId(lastSale.id + 1);
    }

    function handleCloseSale(saleId: string, id: string | any) {
        router.push({ pathname: `/sale/close-sale/`, params: { saleId, id } });
    }

    useEffect(() => {
        setSaleId(id.toString());
        handleGetLastSaleId();
        setProductList(products);
        setFilteredProducts(products);
    }, []);

    return (
        <>
            <SafeAreaView className="flex py-4 px-3 mb-4 gap-3 bg-blue-950">
                <View className="items-center">
                    <Text className="text-2xl text-gray-200 font-heading">Pedido nº {lastSaleId}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity activeOpacity={0.5} onPress={handleGoBack}>
                        <Feather name="chevron-left" size={28} color={colors.gray[200]} />
                    </TouchableOpacity>
                    <Text className="text-gray-200">
                        Mesa {saleId}
                    </Text>
                    <View>
                        <SaleCart quantity={cartStore.products.length} onPress={() => { handleCloseSale(lastSaleId, id) }} />
                    </View>
                </View>
            </SafeAreaView>
            <View className="flex w-full px-2 py-2 mb-10 items-center justify-center border-[1px]">
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <CategoryButton
                            title={item.name}
                            isSelected={item.name === category}
                            onPress={() => { handleCategorySelect(item.name) }}
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
                keyExtractor={(product) => product.id}
                renderItem={(product) => {
                    const productInCart = cartStore.products.find(cartItem => cartItem.id === product.item.id);
                    const quantityInCart = productInCart ? productInCart.quantity : 0;
                    return (
                        <Product
                            title={product.item.title}
                            subtitle={product.item.subtitle}
                            price={formatCurrency(product.item.price)}
                            action={() => handleEditProduct(product.item.id)}
                            quantity={quantityInCart.toString()} />
                    )
                }
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </>
    )
}