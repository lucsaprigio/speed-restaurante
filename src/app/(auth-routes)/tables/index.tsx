import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TableCard } from "../../components/table-card";
import { useRouter } from "expo-router";
import { SignedHeader } from "../../components/signed-header";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { Table } from "../../../DTO/TableDTO";
import { useAuth } from "../../hooks/auth";
import { Loading } from "../../components/loading";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export default function Tables() {
    const { signOut } = useAuth();
    const router = useRouter();

    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    function handleOpenSale(id: string, busy: string, saleId: string) {
        if (busy === 'S') {
            return router.push({
                pathname: `/(auth-routes)/show-sale/${id}`,
                params: { saleId }
            })
        } else {
            return router.push(`/sale/${id}`)
        }
    };

    function handleGoBack() {
        return router.back();
    }

    async function handleGetTables() {
        try {
            const response = await api.get('/tables');
            setTables(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            Alert.alert('Ocorreu um erro', 'Não foi possível carregar as mesas');
        };
    };

    async function onRefresh() {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
            handleGetTables();
        })
    };

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
        handleGetTables();
    }, [loading]);

    return (
        <>
            <SignedHeader onPress={handleLogout} />
            <ScrollView
                className="py-4 flex-1 bg-gray-200"
                refreshControl={<RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh} />}
            >
                <TouchableOpacity className="flex flex-row items-center gap-3 mb-3" onPress={handleGoBack} >
                    <Feather name="chevron-left" size={24} color={colors.zinc[900]} />
                    <Text className="text-lg">Voltar</Text>
                </TouchableOpacity>
                <Text className="font-heading text-lg m-2 text-gray-500">Selecione uma mesa para começar:</Text>

                <View className="flex flex-row flex-wrap gap-1 items-center justify-center">
                    {
                        loading === true ? (<Loading />) :
                            (
                                tables.length > 0 ? (
                                    tables.map((table) => (
                                        <TableCard
                                            onPress={() => { handleOpenSale(table.CD_MESA, table.OCUPADA, table.CD_PEDIDO) }}
                                            key={table.CD_MESA.toString()}
                                            busy={table.OCUPADA.toString()}
                                            id={table.CD_MESA}
                                        />
                                    ))
                                ) : (
                                    <View className="flex-1 items-center justify-center p-3">
                                        <Text className="text-lg text-gray-500">Não há mesas cadastradas</Text>
                                    </View>
                                )
                            )
                    }
                </View>
            </ScrollView>
        </>
    )
}