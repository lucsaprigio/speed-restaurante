import { Redirect, Slot } from "expo-router";
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
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  useEffect(() => {
    const disableBackHandler = () => {
      return true; // Impede a ação padrão do botão de voltar
    };

    BackHandler.addEventListener('hardwareBackPress', disableBackHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackHandler);
    };
  }, []); // Apenas é executado uma vez no carregamento inicial

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