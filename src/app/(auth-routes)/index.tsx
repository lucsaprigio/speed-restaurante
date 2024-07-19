import { Alert, BackHandler, RefreshControl, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SignedHeader } from "../../components/signed-header";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth";
import { Button } from "@/components/button";

export default function Painel() {
    const { signOut } = useAuth();
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [refresh, setRefresh] = useState(false);

    async function onRefresh() {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        })
    };

    function handleOpenSale() {
        return router.push(`/sale/${id}`)
    };

    function handleOpenTables() {
        return router.push('/tables');
    }


    function handleLogout() {
        return Alert.alert('Logoff', 'Deseja sair?', [
            {
                text: 'Não'
            },
            {
                text: 'Sair',
                onPress: () => {
                    signOut();
                }
            }
        ])
    };

    useEffect(() => {
        const disableBackHandler = () => {
            return true; // Impede a ação padrão do botão de voltar
        };

        BackHandler.addEventListener('hardwareBackPress', disableBackHandler);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', disableBackHandler);
        };
    }, [])

    return (
        <>
            <SignedHeader onPress={handleLogout} />
            <ScrollView
                className="py-4 flex-1 bg-gray-200"
                refreshControl={<RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh} />}
            >
                <Text className="font-heading text-lg m-2 text-gray-500">Selecione uma das opções abaixo:</Text>

                <View className="flex w-full h-full p-8 gap-10 mt-3">
                    <Button onPress={() => handleOpenSale()}>
                        <Button.Text>
                            Abrir Venda
                        </Button.Text>
                    </Button>
                    <Button onPress={() => handleOpenTables()}>
                        <Button.Text>
                            Abrir Mesas
                        </Button.Text>
                    </Button>
                </View >
            </ScrollView>
        </>
    )
}