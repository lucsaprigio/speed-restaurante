import { useEffect, useState } from "react";
import { Alert, BackHandler, Image, RefreshControl, ScrollView, Text, View, Modal } from "react-native";
import { useAuth } from "../hooks/auth";

import { api } from "../api/api";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { UserList } from "../../DTO/UserDTO";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import GarcomJpg from "../../assets/garcom.jpg";

import colors from "tailwindcss/colors";

export default function SignIn() {
    const { signIn, config, saveDataApi } = useAuth();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [ip, setIp] = useState(config.ipConnection);
    const [cnpj, setCnpj] = useState(config.cnpj);
    const [email, setEmail] = useState(config.email);

    const [users, setUsers] = useState<UserList[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);

    async function handleLogin(userId: string, password: string) {
        if (password !== '') {
            await signIn({
                userId,
                password,
                ipConnection: config.ipConnection
            });
        } else {
            Alert.alert('Favor preencher a senha')
        }
    }

    function handleUpdateConection() {
        try {
            Alert.alert("Atualizar dados ⚠", "Você estará atualizando os dados de conexão, deseja continuar?", [
                {
                    text: "Não",
                    onPress: () => { setShowModal(false) }
                },
                {
                    text: "Alterar",
                    onPress: () => { setShowModal(false), saveDataApi({ ipConnection: `${ip}:8082`, cnpj, email }); }
                }
            ])
        } catch (err) {
            Alert.alert('Algo deu errado ❌', "Não foi possível concluir a operação.")
        }
    }

    async function handleGetUsers() {
        try {
            console.log(`${config.ipConnection}/users`)
            const response = await api.get(`${config.ipConnection}/users`);

            setUsers(response.data);
            setUserId(response.data[0].USERID);
            console.log(config);
        } catch (err) {
            console.log(err)
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

        const disableBackHandler = () => {
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', disableBackHandler);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', disableBackHandler);
        };
    }, []);

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={showModal}>
                <View className="flex h-full justify-center bg-zinc-700">
                    <View className="flex items-center justify-center bg-gray-200 rounded-md p-10">
                        <Text className="text-lg font-bold text-blue-950 p-3">Configurações de conexão</Text>
                        <Input
                            title="Endereço IP (Servidor)"
                            value={ip}
                            onChangeText={setIp}
                        />
                        <Input
                            title="CNPJ"
                            value={cnpj}
                            onChangeText={setCnpj}
                        />
                        <Input
                            title="E-mail"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Button className="mb-2" onPress={() => handleUpdateConection()}>
                            <Button.Text>
                                Alterar
                            </Button.Text>
                            <Button.Icon>
                                <Feather name="edit" size={18} color={colors.gray[50]} />
                            </Button.Icon>
                        </Button>
                        <Button onPress={() => setShowModal(false)}>
                            <Button.Text>
                                Fechar
                            </Button.Text>
                            <Button.Icon>
                                <Feather name="x" size={18} color={colors.gray[50]} />
                            </Button.Icon>
                        </Button>
                    </View>
                </View>
            </Modal>
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
            <Button className="absolute bottom-3 right-3 w-14 h-14 rounded-full" onPress={() => setShowModal(true)}>
                <MaterialIcons name="settings" size={28} color={colors.gray[50]} />
            </Button>
        </>
    )
}