export function formatCurrency(value: number | any) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}