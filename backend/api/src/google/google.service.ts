import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import { CalculateDistanceRequestDto } from 'dtos/requests/calculateDistanceRequestDto';

@Injectable()
export class GoogleService {


    private client: Client;

    constructor(private configService: ConfigService) {
        this.client = new Client({});
    }

    async getCoordinates(address: string): Promise<any> {
        try {
            const response = await this.client.geocode({
                params: {
                    address: address,
                    key: this.configService.get<string>('GOOGLE_API_KEY'),
                },
            });

            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng,
            };
        } catch (error) {
            throw new Error('Erro ao converter o endereço em coordenadas: ' + error.message);
        }
    }


    async calculateDistance(data: CalculateDistanceRequestDto): Promise<any> {
        try {
            const response = await this.client.directions({
                params: {
                    origin: data.origin,
                    destination: data.destination,
                    key: this.configService.get<string>('GOOGLE_API_KEY'),
                    region: "BR",
                },
            });
            const distance = response.data.routes[0].legs[0].distance;
            const duration = response.data.routes[0].legs[0].duration;
            const waypoints = response.data.routes[0].overview_polyline;

            return {
                distance: distance,
                duration: duration,
                waypoints: waypoints.points,
            };
        } catch (error) {
            throw new Error('Erro ao calcular a distância: ' + error.message);
        }
    }   
}