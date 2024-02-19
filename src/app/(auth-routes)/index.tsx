import { ScrollView, Text, View } from "react-native";
import { TableCard } from "./components/table-card";
import { useRouter } from "expo-router";
import { SignedHeader } from "./components/signed-header";

export default function Tables() {
    const router = useRouter();

    const tables = [
        {
            id: '1',
            busy: false
        },
        {
            id: '2',
            busy: false
        },
        {
            id: '3',
            busy: false
        },
        {
            id: '4',
            busy: false
        },
        {
            id: '5',
            busy: false
        },
        {
            id: '6',
            busy: false
        }
    ]

    function handleOpenSale(id: string) {
        return router.push(`/sale/${id}`)
    }

    return (
        <>
            <SignedHeader />
            <ScrollView className="py-4 flex-1 bg-gray-200">
                <Text className="font-heading text-lg m-2 text-gray-500">Selecione uma mesa para começar:</Text>

                <View className="flex flex-row flex-wrap gap-1 items-center justify-center">
                    {
                        tables.map((table) => (
                            <TableCard key={table.id} busy={table.busy} id={table.id} onPress={() => handleOpenSale(table.id)} />
                        ))
                    }
                </View>
            </ScrollView>
        </>
    )
}