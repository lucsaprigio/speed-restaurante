import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ProductProps = TouchableOpacityProps & {
    id?: string;
    title?: string;
    subtitle?: string;
    price?: string;
    quantity?: string;
    add?: () => void;
    remove?: () => void;
    action?: () => void;
}

export function Product({ id, price, title, subtitle, quantity, add, remove, action, ...rest }: ProductProps) {
    return (
        <TouchableOpacity className="flex w-full h-20 px-2 flex-row items-center justify-between  border-b-[1px] border-gray-400" activeOpacity={0.7} onPress={action}>
            <View className="flex flex-row items-center" >
                <View className="flex items-start justify-center gap-1 p-1">
                    <Text className="text-lg text">{title}</Text>
                    <Text className="text-gray-500">{subtitle}</Text>
                    <Text className="text-md text-blue-800 font-bold">{price}</Text>
                </View>
            </View>
            <View>
                {
                    quantity !== '0' && (
                        <Text className="text-green-600">
                            {quantity} Adicionado(s) ao pedido!
                        </Text>
                    )}
            </View>
        </TouchableOpacity>
    )
}