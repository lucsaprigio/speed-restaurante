import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type UserSalesProps = TouchableOpacityProps & {
    saleId: string;
    total: string;
    closed: string;
    tableId?: string;
    obs?: string;
}

export function UserSalesCard({ closed, saleId, total, tableId, obs, ...rest }: UserSalesProps) {
    return (
        <TouchableOpacity className="flex items-start justify-start w-full rounded-md p-5 bg-gray-200 space-y-3" activeOpacity={0.7} {...rest}>
            <View className="flex flex-row items-center justify-start w-full space-x-16 border-b-[1px] border-gray-400 py-2">
                <Text className="text-lg font-heading text-blue-950">Pedido Nº {saleId}</Text>
                <Text className="text-lg text-blue-950">Mesa {tableId ? tableId : 'não selecionada'}</Text>
            </View>
            <Text className="text-gray-600">{obs && "Sem Observação"}</Text>
            <Text className="text-lg text-green-700 font-bold">Total: R$ {total}</Text>
            <Text className="text-sm text-green-600">{closed === 'N' ? "Em aberto" : "Fechado"}</Text>
        </TouchableOpacity>
    )
}