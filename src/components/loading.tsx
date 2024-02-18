import { ActivityIndicator, View } from "react-native";

import colors from "tailwindcss/colors";


export function Loading() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-200">
            <ActivityIndicator color={colors.blue[700]} size={32}/>
        </View>
    )
}