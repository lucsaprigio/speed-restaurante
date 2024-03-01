import { ProductDTO } from '@/DTO/ProductDTO';
import { ProductCartProps } from '../product-cart';

export function add(products: ProductCartProps[], newProduct: ProductDTO) {
    const existingProduct = products.find(({ id }) => newProduct.id === id);

    if (existingProduct) {
        return products.map((product) => product.id === existingProduct.id
            ? { ...products, quantity: product.quantity + 1 }
            : product)
    }

    return [...products, { ...newProduct, quantity: 1 }]
};

export function remove(products: ProductCartProps[], productRemoveId: string) {
    const updatedProducts = products.map((product) => product.id === productRemoveId ? {
        ...product,
        quantity: product.quantity > 1 ? product.quantity - 1 : 0
    } : product
    )

    return updatedProducts.filter((product) => product.quantity > 0);
};