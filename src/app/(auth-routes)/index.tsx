import { Alert, BackHandler, ImageComponent, RefreshControl, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SignedHeader } from "../components/signed-header";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth";
import { IconButton } from "@/app/components/menu-button";

export default function Painel() {
    const { signOut, user } = useAuth();
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

    function handleOpenMySales() {
        return router.push(`/my-sales`);
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
    }, []);

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

                <View className="flex flex-row w-full h-full p-3 gap-4 mt-3">
                    <IconButton
                        title="Novo pedido"
                        iconName="add"
                        onPress={() => handleOpenSale()}
                    />
                    <IconButton
                        title="Mesas"
                        iconName="table-bar"
                        onPress={() => handleOpenTables()}
                    />
                    <IconButton
                        title="Meus pedidos"
                        iconName="view-agenda"
                        onPress={() => handleOpenMySales()}
                    />
                </View>
            </ScrollView>
        </>
    )
}