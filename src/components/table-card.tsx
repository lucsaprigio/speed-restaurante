import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

type TableCardProps = TouchableOpacityProps & {
    busy?: string;
    id: string;
}

export function TableCard({ busy = 'N', id, ...rest }: TableCardProps) {
    return (
        busy === 'N' ? (
            <TouchableOpacity className="flex items-center justify-center p-2 bg-green-500 rounded-md w-32 h-24" activeOpacity={0.6} {...rest} >
                <MaterialIcons name="table-bar" size={32} />
                <Text>{id}</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity className="flex items-center justify-center p-2 bg-red-500 rounded-md w-32 h-24" activeOpacity={0.6} {...rest}>
                <MaterialIcons color={colors.white} name="table-bar" size={32} />
                <Text className="text-white">{id}</Text>
            </TouchableOpacity>
        )
    )
}