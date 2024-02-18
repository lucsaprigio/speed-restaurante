import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import IconImg from "../assets/logo-speed-branco.png";

type HeaderProps = {
    title: string;
    icon?: boolean;
}

export function Header({ title, icon = false }: HeaderProps) {
    return (
        <SafeAreaView className="flex h-56 items-center justify-center bg-blue-950">
            {icon && <Image source={IconImg} resizeMode="contain" className="w-28 h-28"/>}
            <Text className="text-2xl font-bold text-gray-100">
                {title}
            </Text>
        </SafeAreaView>
    )
}