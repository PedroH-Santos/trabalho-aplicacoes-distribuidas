import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';
import { VehicleDto } from 'dtos/entities/vehicleDto';

@Injectable()
export class VehicleRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  async insertVehicle(obj: VehicleDto) {
    const { data, error } = await this.supabase
      .from('veiculo')
      .insert([obj])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateVehicle(obj: VehicleDto) {
    const { data, error } = await this.supabase
      .from('veiculo')
      .update(obj)
      .eq('veiculoid', obj.veiculoid)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async deleteVehicleById(id: number) {
    const { error } = await this.supabase
      .from('veiculo')
      .delete()
      .eq('veiculoid', id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async getVehicleById(id: number) {
    const { data, error } = await this.supabase
      .from('veiculo')
      .select('*')
      .eq('veiculoid', id)
      .single();

    if (!data) {
      throw new NotFoundException('Não foi encontrado o veiculo informado');
    }

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  


  async getVehicleByIdClient(id: number) {
    const { data, error } = await this.supabase
      .from('veiculo')
      .select('*')
      .eq('clienteid', id);

    if (!data) {
      throw new NotFoundException('Não foi encontrado nenhum veículo do cliente');
    }

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
