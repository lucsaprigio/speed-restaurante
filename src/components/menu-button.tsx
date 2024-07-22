import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

type IconButtonProps = TouchableOpacityProps & {
    title: string;
    iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function IconButton({ title, iconName, ...rest }: IconButtonProps) {
    return (
        <TouchableOpacity className="flex items-center justify-center w-28 h-28 bg-blue-950 rounded-md" activeOpacity={0.7}{...rest}>
            <MaterialIcons
                name={iconName}
                size={24}
                color={colors.gray[50]}
            />
            <Text className="text-gray-50">{title}</Text>
        </TouchableOpacity>
    )
}