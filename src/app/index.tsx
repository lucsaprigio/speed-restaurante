import { useRouter } from 'expo-router';

import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { View, Text } from "react-native";


export default function Home() {
    const router = useRouter();

    function handleRegister() {
        return router.push('/signin/')
    }

    //Alteração
    return (
        <>
            <Header title="Cadastrar Aparelho" icon />

            <View className="flex items-center justify-center">
                <Text className="text-lg m-10 text-center">
                    Preencha os campos abaixo para continuar
                </Text>
            </View>

            <View className="flex-1">
                <Input title="MAC" editable={false} />
                <Input title="CNPJ" keyboardType="number-pad" />
                <Input title="E-mail" keyboardType="email-address" />

                <View className="mt-5 px-4">
                    <Button onPress={handleRegister}>
                        <Button.Text>
                            Cadastrar
                        </Button.Text>
                    </Button>
                </View>
            </View>
        </>
    )
} 