import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { transparent } from "tailwindcss/colors";

export default function Root() {
    return (
        <>
            <StatusBar translucent backgroundColor={transparent} />
            <Slot />
        </>
    )
}