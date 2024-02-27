import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from 'clsx';

type CategoryProps = PressableProps & {
    title: string;
    isSelected?: boolean;
}

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {

    return (
        <Pressable
            className={
                clsx(
                    "px-4 justify-center rounded-md h-10", isSelected ? " bg-blue-950" : "bg-transparent")
            }
            {...rest}
        >
            <Text className={
                clsx("font-subtitle text-sm", isSelected ? "text-gray-100" : "text-blue-950")}>{title}</Text>
        </Pressable>
    )
}