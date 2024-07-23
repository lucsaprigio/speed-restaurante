import { useRouter } from 'expo-router';

import { getRealm } from '../databases/realm';
import { Button } from "@/app/components/button";
import { Header } from "@/app/components/header";
import { Input } from "@/app/components/input";
import { View, Text, Alert } from "react-native";
import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import * as SecureStore from 'expo-secure-store';

export default function Home() {
    const router = useRouter();

    const [ipConnection, setIpConnection] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');

    async function handleRegister() {
        const realm = await getRealm();

        try {
            realm.write(() => {
                realm.create("Config", {
                    _id: uuid.v4(),
                    ipConnection,
                    cnpj,
                    email
                });
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

    /* 
        useEffect(() => {
            async function getInfo() {
                const user = await SecureStore.getItemAsync('app_user');
    
                if (!!user) {
                    router.push('/(auth-routes)')
                }
    
                handleRegister();
            }
            getInfo();
        }, []); */

    return (
        <>
            <Header title="Cadastrar Aparelho" icon />

            <View className="flex items-center justify-center">
                <Text className="text-lg m-10 text-center">
                    Preencha os campos abaixo para continuar
                </Text>
            </View>

            <View className="flex-1">
                <Input title="Host" keyboardType="number-pad" />
                <Input title="CNPJ" keyboardType="number-pad" />
                <Input title="E-mail" keyboardType="email-address" />

                <View className="mt-5 px-4">
                    <Button onPress={handleRegister}>
                        <Button.Text>
                            Cadastrar
                        </Button.Text>
                    </Button>
                </View>
                <View className="absolute bottom-0 px-2">
                    <Text className="text-xs text-blue-950">v.1.0.0</Text>
                </View>
            </View>
        </>
    )
} 