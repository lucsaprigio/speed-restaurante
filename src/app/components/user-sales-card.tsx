import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";

type UserSalesProps = TouchableOpacityProps & {
    saleId: string;
    total: string;
    closed: string;
    tableId?: string;
    obs?: string;
    created_at: string;
}

export function UserSalesCard({ closed, saleId, total, tableId, obs, created_at, ...rest }: UserSalesProps) {
    return (
        <TouchableOpacity
            className="flex flex-row items-start justify-start w-full rounded-md p-5 bg-gray-200 space-y-3 border-r-8 border-green-600"
            activeOpacity={0.7} {...rest}
        >
            <View className="flex items-start justify-start w-full  py-2 gap-1">
                <View className="flex flex-row items-center justify-center gap-1">
                    <MaterialIcons name="bookmark" size={24} color={colors.blue[950]} />
                    <Text className="text-lg font-heading text-blue-950">Pedido Nº {saleId}</Text>
                </View>
                <View className="flex flex-row items-center justify-center gap-1">
                    <MaterialIcons name="table-bar" size={24} color={colors.blue[950]} />
                    <Text className="text-lg text-blue-950"> Mesa {tableId ? tableId : 'não selecionada'} </Text>
                </View>

                <View className="w-full p-1 border-b-[1px] border-gray-400" />

                <View className="flex space-y-2">
                    <Text className="text-gray-600">Observações:</Text>
                    <Text className="text-gray-600">{obs ? obs : "Sem observação"}</Text>
                    <Text className="text-lg text-green-700 font-bold">Total: R$ {total}</Text>
                    <Text className="opacity-50">
                        Pedido realizado às {created_at}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}