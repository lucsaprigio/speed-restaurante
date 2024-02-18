import { useRouter } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
    const router = useRouter();

    function handleSignIn() {
        return router.push('/(auth-routes)/')
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <View className="flex items-center justify-center">
                <Text className="text-3xl font-bold">
                    Bem-vindo
                </Text>
                <Text className="text-lg font-subtitle">
                    Entrar
                </Text>
            </View>
            <View className="items-center justify-center mt-8">
                <Input placeholder="Usuário" footerTitle="Por favor selecione seu usuário acima" />
                <Input placeholder="Senha" inputPassword />
            </View>
            <View className="w-full px-8 mt-10">
                <Button onPress={handleSignIn}>
                    <Button.Text>
                        Entrar
                    </Button.Text>
                </Button>
            </View>

        </SafeAreaView>
    )
}