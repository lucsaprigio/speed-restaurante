import { useRouter } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { User } from "@/DTO/UserDTO";

export default function SignIn() {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    function handleSignIn() {
        return router.push('/(auth-routes)/')
    }

    useEffect(() => {
        async function handleGetUsers() {
            const response = await api.get('/users');
            console.log(response.data)

            setUsers(response.data);
            setUserId(response.data.CD_OPERADOR);
        }

        handleGetUsers()
    }, []);

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
                <Picker
                    mode="dialog"
                    selectedValue={userId}
                    onValueChange={(item: string) => {
                        setUserId(item)
                    }}
                    placeholder="Selecione o operador"
                    className="w-full"
                >
                    {
                        users.map((user) => (
                            <Picker.Item key={user.CD_OPERADOR} label={user.NOME_OPERADOR} value={user.CD_OPERADOR} />
                        ))
                    }
                </Picker>
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