import { BadRequestException, Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environment/environment';
import { StartRaceRequestDto } from 'dtos/requests/startRaceRequestDto';

@Injectable()
export class RaceRepository {
    private supabase: SupabaseClient;

    constructor() {

        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey,
        );
     }

    async insertStartedRace(request: StartRaceRequestDto) {
        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getSeconds() + request.timeCalculated);
        const { data, error } = await this.supabase
            .from('corrida')
            .insert([
                {
                    localizacaoorigem: request.addressOrigin,
                    localizacaodestino: request.addressDestination,
                    tempochegada: currentDate.toISOString(),
                    consumoco2: request.co2Consumed,
                    distancia: request.distance,
                    veiculoid: request.vehicleId,
                    clienteid: request.clientId,
                    status: "CREATED",

                },
            ])
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
    async getRacesByClientId(clientId: number, status: string) {
        const { data, error } = await this.supabase
            .from('corrida')
            .select('*') 
            .eq('clienteid', clientId) 
            .eq('status',status);
        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
    async getLastRace() {
        const { data, error } = await this.supabase
            .from('corrida')
            .select('*')
            .order('corridaid', { ascending: false }) 
            .limit(1); 

        if (error) {
            throw new Error(error.message);
        }
        return data ? data[0] : null; 
    }
    async updateRaceStatusToFinished(raceId: number) {
        
        const { data, error } = await this.supabase
            .from('corrida') 
            .update({ status: 'FINISHED' })
            .eq('corridaid', raceId); 

        if (error) {
            throw new Error(`Erro ao atualizar o status da corrida: ${error.message}`);
        }
        return data; 
    }
}
