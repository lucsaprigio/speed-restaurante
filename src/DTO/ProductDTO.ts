export type ProductDTO = {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    category: string;
}

export type ProductList = {
    CD_PRODUTO: string;
    CD_CATEGORIA: string;
    DESCRICAO_PRODUTO: string;
    DESCRICAO_CATEGORIA: string;
    VR_UNITARIO: number;
}

export type ProductCartLaunch = {
    productId: string;
    productDescription: string,
    quantity: number;
    price: number;
    descount?: number;
    totalProduct: number;
    obsProduct: string;
}
