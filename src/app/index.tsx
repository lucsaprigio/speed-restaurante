import { useEffect, useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

import { getRealm } from '../databases/realm';
import { Button } from "./components/button";
import { Header } from "./components/header";
import { Input } from "./components/input";
import uuid from 'react-native-uuid';
import { ConfigDTO } from '@/DTO/ConfigDTO';

export default function Home() {
    const router = useRouter();

    const [ipConnection, setIpConnection] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [config, setConfig] = useState<ConfigDTO[]>([]);

    async function handleRegister() {
        const realm = await getRealm();

        try {
            realm.write(() => {
                const created = realm.create("Config", {
                    _id: uuid.v4(),
                    ipConnection,
                    cnpj,
                    email
                });
                console.log(created)
            });

            realm.close();
            Alert.alert("Cadastro", "Cadastrado com sucesso!");
            router.push('/signin');
        } catch (err) {
            Alert.alert("Cadastro", "Não foi possível cadastrar!");
        } finally {
            realm.close();
        }
    }

    async function getInfo() {
        const realm = await getRealm();

        try {
            const response = realm.objects<ConfigDTO>("Config").toJSON()

            // setConfig(response)
            console.log(config)
            if (response.length > 0) {
                Alert.alert("Dados Cadastrais", "")
            }

        } catch {
            Alert.alert("Ocorreu um erro!", "Não foi possível pegar os dados cadastrados.")
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <GestureHandlerRootView className="flex-1">

            <KeyboardAvoidingView behavior='position' enabled >
                <Header title="Cadastrar Aparelho" icon />

                <View className="flex items-center justify-center">
                    <Text className="text-lg m-10 text-center">
                        Preencha os campos abaixo para continuar
                    </Text>
                </View>

                <View>
                    <Input
                        title="IP:PORTA"
                        placeholder="255.255.255.0:1000"
                        value={ipConnection}
                        onChangeText={setIpConnection}
                        keyboardType="number-pad"
                    />
                    <Input
                        title="CNPJ"
                        placeholder="00.000.000/0000-00"
                        maxLength={19}
                        value={cnpj}
                        onChangeText={setCnpj}
                        keyboardType="number-pad"
                    />
                    <Input
                        title="E-mail"
                        placeholder="email@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCapitalize="none"
                    />

                    <View className="mt-5 px-4 space-y-2">
                        <Button onPress={handleRegister}>
                            <Button.Text>
                                Cadastrar
                            </Button.Text>
                        </Button>
                        <Button onPress={handleRegister}>
                            <Button.Text>
                                Limpar configurações
                            </Button.Text>
                        </Button>
                    </View>
                    <View className="absolute bottom-0 px-2">
                        <Text className="text-xs text-blue-950">v.1.0.0</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    )
} 