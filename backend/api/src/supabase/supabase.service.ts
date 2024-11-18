import { Injectable } from '@nestjs/common';
import { environment } from '../environment/environment';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { signUpCliente } from 'dtos/requests/signUpCliente';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private readonly clientService: ClientService) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  get user() {
    return this.supabase.auth.getUser();
  }

  get session() {
    return this.supabase.auth.getSession();
  }

  table(resource: string) {
    return this.supabase.from(resource);
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    if (!data || !data.user || !data.user.id) {
      throw new Error('Usuário não encontrado');
    }

    const cliente = await this.clientService.getClientByUuid(data.user.id);

    if (!cliente) {
      throw new Error('Houve um erro ao carregar os dados do cliente');
    }

    return {
      token: data.session.access_token,
      token_expires_in: data.session.expires_in,
      refresh_token: data.session.refresh_token,
      cliente,
    }
  }

  async signUp(obj: signUpCliente) {
    const { data, error } = await this.supabase.auth.signUp({
      email: obj.email,
      password: obj.password
    });

    if (error) {
      throw new Error(error.message);
    }

    const { user: { id } } = data;

    obj.uuid = id;

    const cliente = await this.clientService.insertClient(obj);

    if (!cliente) {
      throw new Error('Houve um erro ao cadastrar o cliente');
    }

    return cliente;
  }

  signOut() {
    this.supabase.auth.signOut();
  }
}
