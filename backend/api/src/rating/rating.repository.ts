import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';
import { InsertRatingDto } from 'dtos/requests/insertRatingDto';

@Injectable()
export class RatingRepository {
    private supabase: SupabaseClient;

    constructor() {

        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey,
        );
    }
    async getCategories() {
        const { data, error } = await this.supabase
            .from('avaliacaocategoria')
            .select('*')
            .eq('status', true)
            
        if (error) {
            throw new Error(error.message);
        }
        if (!data) {
            throw new NotFoundException('Não foi encontrado as categorias de avaliacao.');
        }
        return data;
    }

    async insertRatings(ratings: InsertRatingDto[]) {
        const { data, error } = await this.supabase
            .from('avaliacaocorrida') 
            .insert(ratings)
            .select(); 

        if (error) {
            throw new Error(error.message);
        }

        return data;

    }
}
