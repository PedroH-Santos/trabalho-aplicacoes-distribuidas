import { LatLng } from "@googlemaps/google-maps-services-js";
import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class StartRaceRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'O endereco de origem é obrigatório' })
    addressOrigin: string;
    @IsString()
    @IsNotEmpty({ message: 'O endereco de destino é obrigatório' })
    addressDestination: string;

    @IsNumber()
    @IsNotEmpty({ message: 'O tempo calculado é obrigatório' })
    timeCalculated: number;

    @IsNumber()
    @IsNotEmpty({ message: 'O tempo calculado é obrigatório' })
    co2Consumed: number;

    @IsNumber()
    @IsNotEmpty({ message: 'A distancia é obrigatório' })
    distance: number;

    @IsNumber()
    @IsNotEmpty({ message: 'O id veiculo é obrigatório' })
    vehicleId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'O id cliente é obrigatório' })
    clientId: number;
    
}