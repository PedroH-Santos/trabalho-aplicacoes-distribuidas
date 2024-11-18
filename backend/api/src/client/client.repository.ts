import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';
import { ClientDto } from 'dtos/entities/clientDto';

@Injectable()
export class ClientRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  async insertClient(obj: ClientDto) {
    const { data, error } = await this.supabase
      .from('cliente')
      .insert([obj])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateClient(obj: ClientDto) {
    const { data, error } = await this.supabase
      .from('cliente')
      .update(obj)
      .eq('clienteid', obj.clienteid)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getClientByUuid(uuid: string) {
    const { data, error } = await this.supabase
      .from('cliente')
      .select('*')
      .eq('uuid', uuid)
      .single();

    if (!data) {
      throw new NotFoundException('Não foi encontrado o cliente informado.');
    }

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getClientById(id: number) {
    const { data, error } = await this.supabase
      .from('cliente')
      .select('*')
      .eq('clienteid', id)
      .single();

    if (!data) {
      throw new NotFoundException('Não foi encontrado o cliente informado.');
    }

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
