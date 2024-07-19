import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { transparent } from "tailwindcss/colors";

export default function AppLayout() {
    return (
        <>
            <StatusBar translucent backgroundColor={transparent} />
            <Slot />
        </>
    )
}