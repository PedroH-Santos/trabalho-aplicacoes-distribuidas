import Toast from 'react-native-toast-message';
import { SignInData } from '../interfaces/SignInData';
import { User } from '../interfaces/User';
import api from '../services/api';
import { SignUpData } from '../interfaces/SignUpData';

interface Response {
  token: string;
  user: User;
}

export async function signIn({ email, password }: SignInData): Promise<Response> {
  try {
    const { data } = await api.post('auth/signin', {
      email,
      password,
    });

    return {
      token: data.token,
      user: {
        id: data.cliente.clienteid,
        name: data.cliente.nome,
        email: data.cliente.email,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao realizar login');
  }
}

export async function signUp(obj: SignUpData) : Promise<boolean> {
  try {
    console.log(api.getUri());
    const { data } = await api.post('auth/signup', obj);

    if (!data || !data.clienteid) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao realizar cadastro',
      })
      return false;
    }

    Toast.show({
      type: 'success',
      text1: 'Cadastro realizado com sucesso',
      text2: 'Favor verificar seu email',
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


export async function signOut() {
  try {
    const { data: { message } } = await api.post('auth/signout');
    Toast.show({
      type: 'success',
      text1: 'LogOut',
      text2: message,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'Erro ao realizar logout',
    });
    throw new Error(`Erro ao realizar logout: ${error}`);
  }
}