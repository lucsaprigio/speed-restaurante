import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useAuth } from "../hooks/auth";

import colors from "tailwindcss/colors";
import { api } from "../api/api";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { UserList } from "@/DTO/UserDTO";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function SignIn() {
    const { signIn } = useAuth();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<UserList[]>([]);

    async function handleLogin(userId: string, password: string) {
        if (password !== '') {
            setUserId(userId)
            await signIn({ userId, password });
        } else {
            Alert.alert('Favor preencher a senha')
        }
    }

    useEffect(() => {
        async function handleGetUsers() {
            const response = await api.get('/users');

            setUsers(response.data);
            setUserId(response.data.USERID)

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
                            <Picker.Item key={user?.USERID} label={user.NAME} value={user.USERID} />
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