import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductCartLaunch, ProductList } from '@/DTO/ProductDTO';

export type ProductCartProps = ProductList & {
    quantity: number;
}

type StateProps = {
    products: ProductCartProps[];
    add: (newProduct: ProductCartProps, quantity: number) => void;
    remove: (productId: string) => void;
    getProductsArray: () => ProductCartLaunch[];
    clear: () => void;
}

export const useCartStore = create(persist<StateProps>((set, get) => ({
    products: [],

    add: (newProduct: ProductCartProps, quantity: number) =>
        set((state) => ({
            products: add(state.products, newProduct, quantity)
        })),

    remove: (productId: string) =>
        set((state) => ({
            products: remove(state.products, productId)
        })),

    clear: () => set(() => ({ products: [] })),

    getProductsArray: () => {
        const state = get();
        return state.products.map((product) => ({
            productId: product.CD_PRODUTO,
            productDescription: product.DESCRICAO_PRODUTO,
            obsProduct: '',
            price: product.VR_UNITARIO,
            totalProduct: product.VR_UNITARIO * product.quantity,
            descount: 0,
            quantity: product.quantity
        }));
    }

}), {
    name: "speed-restaurante:cart",
    storage: createJSONStorage(() => AsyncStorage),
}))

function add(products: ProductCartProps[], newProduct: ProductList, quantity: number): ProductCartProps[] {
    const existingProduct = products.find(({ CD_PRODUTO }) => newProduct.CD_PRODUTO === CD_PRODUTO);

    if (existingProduct) {
        return products.map((product) =>
            product.CD_PRODUTO === existingProduct.CD_PRODUTO
                ? { ...product, quantity: product.quantity + quantity }
                : product
        );
    }

    return [...products, { ...newProduct, quantity: quantity }];
}

function remove(products: ProductCartProps[], productRemovedId: string) {
    const updatedProducts = products.map((product) =>
        product.CD_PRODUTO === productRemovedId ? {
            ...product,
            quantity: product.quantity > 1 ? product.quantity - 1 : 0
        } : product
    )

    return updatedProducts.filter((product) => product.quantity > 0);
}