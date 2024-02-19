import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

type TableCardProps = TouchableOpacityProps & {
    busy?: boolean;
    id: string;
}

export function TableCard({ busy = false, id, ...rest }: TableCardProps) {
    return (
        !busy ? (
            <TouchableOpacity className="flex items-center justify-center p-2 bg-green-500 rounded-md w-32 h-24" {...rest} activeOpacity={0.6}>
                <MaterialIcons name="table-bar" size={32} />
                <Text>{id}</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity className="flex items-center justify-center p-2 bg-red-500 rounded-md w-32 h-24" {...rest} activeOpacity={0.6}>
                <MaterialIcons color={colors.white} name="table-bar" size={32} />
                <Text className="text-white">{id}</Text>
            </TouchableOpacity>
        )
    )
}