import { ProductDTO } from '@/DTO/ProductDTO';
import { ProductCartProps } from '../product-cart';

export function add(products: ProductCartProps[], newProduct: ProductDTO) {
    const existingProduct = products.find(({ CD_PRODUTO }) => newProduct.id === CD_PRODUTO);

    if (existingProduct) {
        return products.map((product) => product.CD_PRODUTO === existingProduct.CD_PRODUTO
            ? { ...products, quantity: product.quantity + 1 }
            : product)
    }

    return [...products, { ...newProduct, quantity: 1 }]
};

export function remove(products: ProductCartProps[], productRemoveId: string) {
    const updatedProducts = products.map((product) => product.CD_PRODUTO === productRemoveId ? {
        ...product,
        quantity: product.quantity > 1 ? product.quantity - 1 : 0
    } : product
    )

    return updatedProducts.filter((product) => product.quantity > 0);
};