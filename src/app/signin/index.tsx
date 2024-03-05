import { useRouter } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { User } from "@/DTO/UserDTO";
import axios from "axios";

export default function SignIn() {
    const router = useRouter();
    const [userId, setUserId] = useState({} as User[]);

    function handleSignIn() {
        return router.push('/(auth-routes)/')
    }

    useEffect(() => {
        async function handleGetUsers() {
            const response = await axios.get('http://localhost:3333/users');
            console.log(response.data)

            setUserId(response.data)
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