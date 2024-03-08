import { useRouter } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { User } from "@/DTO/UserDTO";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useAuth } from "../hooks/auth";

export default function SignIn() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    function handleLogin(id: string, password: string) {
        if (password !== '') {
            setUserId(id)
            console.log(id, password)
            signIn({ userId: userId, password });
        } else {
            Alert.alert('Favor preencher a senha')
        }

    }

    useEffect(() => {
        async function handleGetUsers() {
            const response = await api.get('/users');

            setUsers(response.data);
            setUserId(response.data.CD_OPERADOR);
        }

        handleGetUsers()
    }, []);

    return (
        <SafeAreaView className="flex-1 items-center justify-center">
            <View className="flex items-center justify-center gap-2">
                <Text className="text-3xl font-bold">
                    Bem-vindo
                </Text>
                <Feather name="user" size={34} color={colors.blue[950]} />
                <Text className="text-lg font-subtitle">
                    Entrar
                </Text>
            </View>
            <View>
                <Picker
                    mode="dialog"
                    selectedValue={userId}
                    onValueChange={(item: string) => {
                        setUserId(item)
                    }}
                    placeholder="Selecione o operador"
                    style={{ width: 350, borderWidth: 1, borderColor: "#0d1c30" }}
                >
                    {
                        users.map((user) => (
                            <Picker.Item key={user.CD_OPERADOR} label={user.NOME_OPERADOR} value={user.CD_OPERADOR} />
                        ))
                    }
                </Picker>
            </View>
            <View className="flex items-center justify-center mt-8">
                <Input
                    placeholder="Senha"
                    inputPassword
                    keyboardType="number-pad"
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            <View className="w-full px-8 mt-10">
                <Button onPress={() => handleLogin(userId, password)}>
                    <Button.Text>
                        Entrar
                    </Button.Text>
                </Button>
            </View>

        </SafeAreaView>
    )
}