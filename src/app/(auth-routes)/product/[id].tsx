import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function Product() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView>

        </ScrollView>
    )
}