import { formatDate } from "@/app/utils/dateFormatted";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AvatarImg from '@/assets/avatar.png';

import colors from "tailwindcss/colors";

type SignedHeaderProps = TouchableOpacityProps & {}

export function SignedHeader({ ...rest }: SignedHeaderProps) {
    const [day, setDay] = useState(0);
    const [weekDay, setWeekday] = useState('');
    const [month, setMonth] = useState('');

    async function handleGetDate() {
        const date = formatDate();

        setDay(date.day);
        setWeekday(date.dayOfWeek);
        setMonth(date.month);
    }

    useEffect(() => {
        handleGetDate();
    }, []);

    return (
        <SafeAreaView className="flex flex-row justify-between bg-blue-950 py-6 px-4 shadow-sm">
            <View className="flex flex-row items-center justify-center">
                <TouchableOpacity className="flex items-center p-1 m-3 rounded-full" activeOpacity={0.5}>
                    {/* <Feather name="user" size={38} color={colors.gray[100]} /> */}
                    <Image className="w-20 h-20" source={AvatarImg} resizeMode="contain" />
                </TouchableOpacity>
                <View>
                    <Text className="text-lg font-subtitle text-gray-100">Olá, Usuário</Text>
                    <Text className="text-sm text-gray-100">{weekDay}, {day} de {month}</Text>
                </View>
            </View>
            <TouchableOpacity className="flex items-center justify-center" {...rest}>
                <Feather name="log-out" size={28} color={colors.gray[100]} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}