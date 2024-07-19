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
    SUBDESCRICAO_PRODUTO: string;
    VR_UNITARIO: number;
}

export type ProductListRegistered = {
    CD_PRODUTO: string,
    CD_SUBGRUPOS: string,
    DESCRICAO_PRODUTO: string;
    DESCRICAO_SUBGRUPO: string,
    SUBPRODUTOS: string,
    VENDA_PRODUTO: number
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

export type ProductLaunchList = {
    CD_PRODUTO: string;
    DESCRICAO_PRODUTO: string,
    QTD_PRODUTO: number;
    UNIT_PRODUTO: number;
    DESCONTO_PRODUTO?: number;
    TOTAL_PRODUTO: number;
    OBS_PRODUTO: string;
    STATUS_LANCA: string;
    ADICIONAL_PRODUTO: string;
}
