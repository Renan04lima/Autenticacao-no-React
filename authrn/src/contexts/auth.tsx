import React, { createContext, useContext, useEffect, useState } from 'react';
// import * as auth from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import HttpService from '../services/HttpService';
import * as auth from '../services/AuthService';
import { Alert } from 'react-native';
import { ResponseType } from 'axios'

export interface User {
  login: string;
  senha: string;
  nome: string | null;
  id: number | null;
}

interface IResponse {
  object: {
    token: string
  }
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(credentials: User): Promise<void>;
  signUp(credentials: User): Promise<void>;
  signOut(): void;
  response: IResponse | null;
  hasNewItem: boolean;
  setHasNewItem: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [response, setResponse] = useState<IResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasNewItem, setHasNewItem] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      // const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      // const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      // if (storagedUser && storagedToken) {
      //   setUser(JSON.parse(storagedUser));
      //   api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      // }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(credentials: User) {
    auth.logout();
    // console.log(credentials)
     await HttpService.login(credentials).then((res: any) => {
      setResponse(res)
      setUser(res.data)
      auth.setAuthUser(res)
    }).catch(() => Alert.alert('Error', 'Erro ao fazer login'))
    // api.defaults.headers.Authorization = `Baerer ${response?.object.token}`;
  }

  async function signUp(credentials: User) {
    auth.logout();
    await HttpService.insert('user/', credentials).then((response: any)=> {
      console.log(response)
      setResponse(response)
      setUser(response.data)
      auth.setAuthUser(response)
    }).catch(()=>Alert.alert('Erro', 'Error ao cadastrar'))
  }

  async function signOut() {
    auth.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut, response, hasNewItem, setHasNewItem, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
