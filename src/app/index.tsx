import { useCallback, useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

import { Button } from "./components/button";
import { Header } from "./components/header";
import { Input } from "./components/input";
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from './hooks/auth';
import { TextMaskInput } from './components/input-mask';

export default function Home() {
    const { saveDataApi, config, clearDataApi } = useAuth();
    const router = useRouter();

    const [ipConnection, setIpConnection] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');

    async function handleRegister() {
        try {
            saveDataApi({ ipConnection: `${ipConnection}:8082`, cnpj: cnpj.replaceAll(/[./-]/g, ""), email });
            Alert.alert("Cadastro", "Cadastrado com sucesso!");
            console.log(config.ipConnection);
            router.push('/signin');
        } catch (err) {
            console.log(err);
            Alert.alert("Cadastro", "Não foi possível cadastrar!");
        }
    }

    async function handleGetInfo() {
        try {
            console.log(config.ipConnection);
            if (config.ipConnection !== undefined) {
                Alert.alert(
                    'Dados cadastrais',
                    `Encontramos dados cadastrados neste aparelho.`,
                    [
                        { text: "Continuar",  onPress: () => router.push('/signin')  }
                    ]
                )
            }
        } catch (err) {
            console.log(err);
            Alert.alert("Ocorreu um erro!", "Não foi possível pegar os dados cadastrados.")
        }
    }

    function handleClearConfig() {
        return clearDataApi();
    }

    useFocusEffect(useCallback(() => {
        handleGetInfo();
    }, [config]));


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
                        title="Endereço IP (Servidor)"
                        placeholder="000.000.000.000"
                        value={ipConnection}
                        onChangeText={setIpConnection}
                        keyboardType="number-pad"
                    />
                    <TextMaskInput
                        title="CNPJ"
                        placeholder="00.000.000/0000-00"
                        maxLength={19}
                        value={cnpj}
                        onChangeText={setCnpj}
                        keyboardType="number-pad"
                        mask='99.999.999/9999-99'
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
                        <Button
                            onPress={handleClearConfig}
                            disabled={!config.ipConnection}
                        >
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