import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductCartLaunch, ProductList } from '@/DTO/ProductDTO';

export type ProductCartProps = ProductList & {
    quantity: number;
    obs: string;
    additional: string;
    total: number;
}

type StateProps = {
    products: ProductCartProps[];
    add: (newProduct: ProductCartProps, quantity: number, additional: string, obs: string, total: number) => void;
    remove: (productId: string) => void;
    getProductsArray: () => ProductCartLaunch[];
    clear: () => void;
}

export const useCartStore = create(persist<StateProps>((set, get) => ({
    products: [],

    add: (newProduct: ProductCartProps, quantity: number, additional: string, obs: string, total: number) =>
        set((state) => ({
            products: add(state.products, newProduct, quantity, additional, obs, total)
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
            obsProduct: product.obs,
            additional: product.additional,
            price: product.VR_UNITARIO,
            totalProduct: product.total,
            descount: 0,
            quantity: product.quantity
        }));
    }

}), {
    name: "speed-restaurante:cart",
    storage: createJSONStorage(() => AsyncStorage),
}))

function add(products: ProductCartProps[], newProduct: ProductList, quantity: number, additional: string, obs: string, total: number): ProductCartProps[] {
    const existingProduct = products.find(({ CD_PRODUTO }) => newProduct.CD_PRODUTO === CD_PRODUTO);

    if (existingProduct) {
        return products.map((product) =>
            product.CD_PRODUTO === existingProduct.CD_PRODUTO
                ? { ...product, quantity: product.quantity + quantity }
                : product
        );
    }

    return [...products, { ...newProduct, quantity: quantity, additional, obs, total }];
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