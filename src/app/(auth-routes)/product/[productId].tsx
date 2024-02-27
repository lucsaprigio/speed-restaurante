import { Button } from "@/components/button";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function Product() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    function handleGoBack() {
        return router.back();
    }

    return (
        <ScrollView>
            <SafeAreaView className="flex flex-row p-10 items-center justify-between  w-full bg-blue-950">
                <TouchableOpacity>
                    <Feather name="chevron-left" size={24} color={colors.gray[50]} onPress={handleGoBack} />
                </TouchableOpacity>
                <Text className="text-gray-50 text-2xl">Produto</Text>
                <View></View>
            </SafeAreaView>
            <View className="flex-1 items-start border-b-[1px] border-gray-400 p-3 space-y-3" >
                <Text className="text-lg mt-5">
                    Produto
                </Text>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget mauris diam. Sed ut tincidunt risus.
                </Text>
                <Text className="text-gray-500 font-heading">
                    R$ 19.99
                </Text>
            </View>

            <View className="flex-1 items-start p-3 border-b-[1px] border-gray-400 m-3">
                <Text>Complementos</Text>
            </View>

            <View className="flex-1 items-start justify-center p-3">
                <Text className="my-3"> <Feather name="paperclip" color={colors.gray[500]} />Observações:</Text>
                <TextInput className="w-full p-1 border-blue-950 border-[1px] h-36 rounded-md" multiline />
            </View>

            <View className="fixed flex-row bottom-0 bg-gray-200 py-6">
                <View className="flex flex-row items-center justify-center gap-3">
                    <TouchableOpacity>
                        <MaterialIcons size={32} name="remove" color={colors.blue[950]} />
                    </TouchableOpacity>
                    <Text>
                        1
                    </Text>
                    <TouchableOpacity>
                        <MaterialIcons size={32} name="add" color={colors.blue[950]} />
                    </TouchableOpacity>
                </View>
                <View className="flex items-center justify-center px-10">
                    <Button>
                        <Button.Text>
                            Adicionar R$ 19.99
                        </Button.Text>

                        <Button.Icon>
                            <Feather name="check" size={24} color={colors.gray[100]} />
                        </Button.Icon>
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}