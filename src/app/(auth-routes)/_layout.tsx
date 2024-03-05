import { Slot, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { transparent } from "tailwindcss/colors";
import { useAuth } from "../hooks/auth";

export default function AppLayout() {
    const { isLogged } = useAuth();

    if (!isLogged) {
        return <Redirect href="/" />
    }

    return (
        <>
            <StatusBar translucent backgroundColor={transparent} />
            <Slot />
        </>
    )
}