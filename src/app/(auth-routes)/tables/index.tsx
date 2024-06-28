import { Alert, RefreshControl, ScrollView, Text, View } from "react-native";
import { TableCard } from "@/components/table-card";
import { useRouter } from "expo-router";
import { SignedHeader } from "../../../components/signed-header";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { Table } from "@/DTO/TableDTO";
import { useAuth } from "../../hooks/auth";
import { Loading } from "@/components/loading";

export default function Tables() {
    const { signOut } = useAuth();
    const router = useRouter();

    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(false);
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

    async function handleGetTables() {
        try {
            setLoading(true);
            const response = await api.get('/tables');

            setTables(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            Alert.alert('Ocorreu um erro', 'Não foi possível carregar as mesas')
        }
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
    }, [tables, loading]);

    return (
        <>
            <SignedHeader onPress={handleLogout} />
            <ScrollView
                className="py-4 flex-1 bg-gray-200"
                refreshControl={<RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh} />}
            >
                <Text className="font-heading text-lg m-2 text-gray-500">Selecione uma mesa para começar:</Text>

                <View className="flex flex-row flex-wrap gap-1 items-center justify-center">
                    {
                        loading === false ? (<Loading />) :
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