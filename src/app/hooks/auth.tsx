import { User } from '../../DTO/UserDTO';
import { ConfigDTO } from '../../DTO/ConfigDTO';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';
import { Alert } from 'react-native';
import { api } from '../api/api';
import { useRouter } from 'expo-router';

type SigninCreadentials = {
    userId: string;
    password: string;
    ipConnection: string;
}

type AuthContextData = {
    user: User | null;
    config: ConfigDTO;
    signIn: (credentials: SigninCreadentials) => Promise<void>;
    saveDataApi: (data: ConfigDTO) => Promise<void>;
    clearDataApi: () => void;
    signOut: () => void;
    isLogged: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const dataApi = new MMKV({ id: 'config' })

function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();

    const [data, setData] = useState<User>({} as User);
    const [config, setConfig] = useState<ConfigDTO>({} as ConfigDTO);

    async function signIn({ userId, password, ipConnection }: SigninCreadentials) {
        try {
            const [response, session] = await Promise.all([
                api.post(`${ipConnection}/signin`, { userId, password }),
                api.post(`${ipConnection}/session/${userId}`)
            ]);

            // const response = await api.post(`${ipConnection}/signin`, { userId, password });

            if (response.data.error) {
                Alert.alert(`${response.data.error}`)
            }

            // const userSession = await api.post(`${ipConnection}/session/${userId}`);

            if (session.data.error) {
                Alert.alert(`${session.data.error}`);
            }

            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.user.token}`
            await SecureStore.setItemAsync('app_user', JSON.stringify(response.data.user));
            await SecureStore.setItemAsync('app_token', JSON.stringify(response.data.user.token));

            setData(response.data.user);
            router.push('/(auth-routes)/');
        } catch (error) {
            if (error.message === 'Request failed with status code 402') {
                Alert.alert('Usuário fora do horário registrado');
            } else {
                Alert.alert('Usuário ou senha incorretos');
            }
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

    async function saveDataApi({ cnpj, email, ipConnection }: ConfigDTO) {
        try {
            const data = JSON.stringify({ ipConnection, cnpj, email });
            dataApi.set('data-api', data);

            // Assumindo que você tem um estado chamado config e uma função setConfig para atualizá-lo
            const storedData = dataApi.getString('data-api'); // ou como quer que você esteja recuperando o dado
            const config = storedData ? JSON.parse(storedData) : {};
            setConfig(config);
        } catch (err) {
            Alert.alert(`${err}`)
        }
    }

    function fetchDataApi() {
        const data = dataApi.getString('data-api');
        setConfig(data ? JSON.parse(data) : {});
    }

    function clearDataApi() {
        return dataApi.delete('data-api');
    }

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storagedUser = await SecureStore.getItemAsync('app_user');
                const storagedToken = await SecureStore.getItemAsync('app_token');

                if (storagedUser && storagedToken) {
                    api.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${storagedToken}`;
                    const userLogged = JSON.parse(storagedUser);
                    setData(userLogged);
                }
            } catch (error) {
                console.log(error)
            }
        }

        loadStorageData();
        fetchDataApi();
    }, []);

    return (
        <AuthContext.Provider value={{
            user: data,
            signIn,
            signOut,
            saveDataApi,
            clearDataApi,
            isLogged: !!data,
            config
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