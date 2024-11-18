import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';

@Injectable()
export class FuelRepository {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey,
        );
     }

    async getFuelById(id: number) {

        const { data, error } = await this.supabase
            .from('combustivel')
            .select('*')
            .eq('id', id)
            .single();


        if (!data) {

            throw new NotFoundException("Não foi encontrado o combustivel informado");
        }

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}
