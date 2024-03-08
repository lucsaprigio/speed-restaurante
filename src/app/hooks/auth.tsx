import { User } from '@/DTO/UserDTO';
import { ReactNode, createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { api } from '../api/api';
import { useRouter } from 'expo-router';

type SigninCreadentials = {
    userId: string;
    password: string;
}

type AuthContextData = {
    user: User | null;
    signIn: (credentials: SigninCreadentials) => Promise<void>;
    signOut: () => void;
    isLogged: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();

    const [data, setData] = useState<User>({} as User);

    async function signIn({ userId, password }: SigninCreadentials) {
        try {
            const response = await api.post('/signin', { userId, password });

            if (response.data.error) {
                Alert.alert(`${response.data.error}`)
            }

            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.user.token}`
            await SecureStore.setItemAsync('app_user', JSON.stringify(response.data.user));
            await SecureStore.setItemAsync('app_token', JSON.stringify(response.data.user.token));

            setData(response.data.user);
            router.push('/(auth-routes)/');
        } catch (err) {
            Alert.alert('Usuário ou senha incorretos');
        }
    }

    async function signOut() {
        try {
            await SecureStore.deleteItemAsync('app_user');
            await SecureStore.deleteItemAsync('app_token');

            setData({} as User);

            router.push('/signin/');
        } catch (err) {
            Alert.alert('Ocorreu um erro, tente novamente')
        }
    }

    return (
        <AuthContext.Provider value={{
            user: data,
            signIn,
            signOut,
            isLogged: !!data
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };