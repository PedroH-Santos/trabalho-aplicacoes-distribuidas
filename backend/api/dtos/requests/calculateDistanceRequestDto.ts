import { LatLng } from "@googlemaps/google-maps-services-js";
import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class CalculateDistanceRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'O endereco de origem é obrigatório' })
    origin: string;
    @IsString()
    @IsNotEmpty({ message: 'O endereco de destino é obrigatório' })
    destination: string;

    @IsNumber()
    @IsNotEmpty({ message: 'O endereco de origem é obrigatório' })
    idVehicle: number;

}