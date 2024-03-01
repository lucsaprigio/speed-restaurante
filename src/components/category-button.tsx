import { Text, Pressable, PressableProps, View } from "react-native";
import { clsx } from 'clsx';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

type CategoryProps = PressableProps & {
    title: string;
    isSelected?: boolean;
    icon?: string;
}

type IconMapping = {
    [key: string]: string | any;
}

export function CategoryButton({ title, isSelected, icon = 'circle', ...rest }: CategoryProps) {
    /*     switch (title) {
            case 'Pizza':
                icon = 'local-pizza';
                break;
            default:
                icon = '';
                break;
        } */

    const iconMapping: IconMapping = {
        'Pizzas': 'pizza',
        'Lanches': 'food',
        'Bebidas': 'bottle-soda-classic',
        'Porções': 'room-service'
    };

    const iconName = iconMapping[title] || 'circle';

    return (
        <Pressable
            className={
                clsx(
                    "flex items-center justify-center px-4 rounded-md h-10", isSelected ? " bg-blue-950" : "bg-transparent")
            }
            {...rest}
        >
            <View className="flex items-center justify-center">
                <MaterialCommunityIcons name={iconName} size={24} color={isSelected ? '#fff' : colors.blue[950]} />
                <Text className={
                    clsx("font-subtitle text-sm", isSelected ? "text-gray-100" : "text-blue-950")}>
                    {title}
                </Text>
            </View>
        </Pressable>
    )
}