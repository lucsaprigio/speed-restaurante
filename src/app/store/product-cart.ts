import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cartInMemory from './helpers/cart-in-memory';

import { ProductDTO } from "@/DTO/ProductDTO";

export type ProductCartProps = cartInMemory.ProductPropsMemory & {
    quantity: number;
}
type StateProps = {
    products: ProductCartProps[];
    add: (product: ProductDTO) => void;
    remove: (productId: string) => void;
    clear: () => void;
}

export const useCartStore = create(persist<StateProps>((set) => ({
    products: [],

    add: (product: ProductDTO) =>
        set((state) => ({
            products: cartInMemory.add(state.products, product)
        })),

    remove: (productId: string) =>
        set((state) => ({
            products: cartInMemory.remove(state.products, productId)
        })),

    clear: () => set(() => ({ products: [] })),

}), {
    name: "speed-restaurante:cart",
    storage: createJSONStorage(() => AsyncStorage),
}))