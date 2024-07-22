import { Redirect, Slot, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { Loading } from "@/components/loading";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { AuthProvider, useAuth } from "./hooks/auth";

// Carregar as fontes antes de iniciar a aplicação
// Obs: Temos que configurar dentro do tailwind.config.js no extend, para fazer junção as fontes com tailwindcss
export default function Layout() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  async function getInfo() {
    const user = await SecureStore.getItemAsync('app_user');

    if (!user) {
      return router.push('/(auth-routes)')
    }

    return router.push('/signin/')
  }


  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AuthProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <Slot />
    </AuthProvider>
  )
}