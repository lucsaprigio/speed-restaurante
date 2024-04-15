import { useEffect, useState } from "react";
import { Alert, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { useAuth } from "../hooks/auth";

import colors from "tailwindcss/colors";
import { api } from "../api/api";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { UserList } from "@/DTO/UserDTO";
import GarcomJpg from "@/assets/garcom.jpg";

export default function SignIn() {
    const { signIn } = useAuth();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState<UserList[]>([]);
    const [refresh, setRefresh] = useState(false);

    async function handleLogin(userId: string, password: string) {
        if (password !== '') {
            setUserId(userId)
            await signIn({ userId, password });
        } else {
            Alert.alert('Favor preencher a senha')
        }
    }

    async function handleGetUsers() {
        try {
            const response = await api.get('/users');

            setUsers(response.data);
            setUserId(response.data.USERID);
        } catch (err) {
            Alert.alert('Ocorreu um erro', 'Não foi possível conectar ao servidor.')
        }
    }

    async function onRefresh() {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
            handleGetUsers();
        })
    };

    useEffect(() => {
        handleGetUsers()
    }, []);

    return (
        <>
            <SafeAreaView className="flex-1 items-center justify-center">
                <View className="flex items-center justify-center gap-1">
                    <Image className="h-40 opacity-75 object-cover rounded-md" source={GarcomJpg} resizeMode="contain" />
                    <Text className="text-3xl font-bold">
                        Bem-vindo 👋
                    </Text>
                    {/* <Feather name="user" size={34} color={colors.blue[950]} /> */}
                </View>
            </SafeAreaView>
            <ScrollView
                className="p-1"
                refreshControl={<RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh} />} >
                <View className="p-8 items-center border-t-[1px] border-gray-200">
                    <Text className="text-lg font-subtitle">
                        Entrar
                    </Text>
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
                    <View className="w-full border-b-[1px] border-gray-950">
                    </View>
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
                <View className="w-full px-8 mt-10 ">
                    <Button onPress={() => handleLogin(userId, password)}>
                        <Button.Text>
                            Entrar
                        </Button.Text>
                    </Button>
                </View>
            </ScrollView>
        </>
    )
}