import React, { createContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from '@react-native-community/async-storage';
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@RNAuth:user");
      const storagedToken = await AsyncStorage.getItem("@RNAuth:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setLoading(false);
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
    }

    loadStorageData();
  });

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    api.defaults.headers.Authorization = `Baerer ${response.token}`;

    await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(response.user));
    await AsyncStorage.setItem("@RNAuth:token", response.token);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;