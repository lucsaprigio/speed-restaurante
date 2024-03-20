import { Alert, ScrollView, Text, View } from "react-native";
import { TableCard } from "../../components/table-card";
import { useRouter } from "expo-router";
import { SignedHeader } from "../../components/signed-header";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { Table } from "@/DTO/TableDTO";
import { useAuth } from "../hooks/auth";

export default function Tables() {
    const { signOut } = useAuth();
    const router = useRouter();

    const [tables, setTables] = useState<Table[]>([]);

    function handleOpenSale(id: string) {
        return router.push(`/sale/${id}`)
    }

    async function handleGetTables() {
        try {
            const response = await api.get('/tables');

            setTables(response.data);
        } catch (err) {
            console.log(err);
        }
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
    }

    useEffect(() => {
        handleGetTables();
    }, [])

    return (
        <>
            <SignedHeader onPress={handleLogout} />
            <ScrollView className="py-4 flex-1 bg-gray-200">
                <Text className="font-heading text-lg m-2 text-gray-500">Selecione uma mesa para começar:</Text>

                <View className="flex flex-row flex-wrap gap-1 items-center justify-center">
                    {
                        tables.map((table) => (
                            <TableCard key={table.CD_MESA.toString()} busy={table.OCUPADA.toString()} id={table.CD_MESA} onPress={() => handleOpenSale(table.CD_MESA.toString())} />
                        ))
                    }
                </View>
            </ScrollView>
        </>
    )
}