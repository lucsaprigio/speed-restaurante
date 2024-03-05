import { ProductDTO } from "@/DTO/ProductDTO";

export type ProductProps = {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    category: string;
}

export const products: ProductDTO[] = [
    {
        id: '1',
        title: 'X-total',
        subtitle: 'X-total',
        price: 19.99,
        category: 'Lanches'
    },
    {
        id: '2',
        title: 'Pizza',
        subtitle: 'Pizza',
        price: 19.99,
        category: 'Pizzas'
    },
    {
        id: '3',
        title: 'Coca-cola',
        subtitle: 'Coca-cola',
        price: 7.00,
        category: 'Bebidas'
    },
    {
        id: '4',
        title: 'Guaraná',
        subtitle: 'Guaraná',
        price: 19.99,
        category: 'Bebidas'
    },
    {
        id: '5',
        title: 'X-bacon',
        subtitle: 'X-bacon',
        price: 19.99,
        category: 'Lanches'
    },
    {
        id: '6',
        title: 'Alcatra com fritas',
        subtitle: 'Porção',
        price: 19.99,
        category: 'Porções'
    },
    {
        id: '7',
        title: 'Porção',
        subtitle: 'Porção',
        price: 19.99,
        category: 'Porções'
    },
]
