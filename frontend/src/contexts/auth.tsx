import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';
import { AuthContextData } from '../interfaces/AuthContextData';
import { User } from '../interfaces/User';
import { AuthProviderProps } from '../interfaces/AuthProviderProps';
import { SignInData } from '../interfaces/SignInData';
import { apiGetClient } from '../services/customer';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('user');
      const storagedToken = await AsyncStorage.getItem('token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(data: SignInData) {

    const response = await auth.signIn(data);
    setUser(response.user);

    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    await AsyncStorage.setItem('user', JSON.stringify(response.user));
    await AsyncStorage.setItem('token', response.token);
  }

  async function signOut() {
    try {
      await auth.signOut();
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );

  async function updateUser(clientId: number) {

    try {
      const data = await apiGetClient(clientId);
      setUser({
        id: data.clienteid,
        name: data.nome,
        email: data.email
      });
    } catch (error) {
    } finally {
    }

  };
};




function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };