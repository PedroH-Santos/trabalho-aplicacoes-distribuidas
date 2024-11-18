import { LatLng } from "@googlemaps/google-maps-services-js";
import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class InsertRatingDto {

    @IsNumber()
    @IsNotEmpty({ message: 'A nota é obrigatório' })
    nota: number;

    @IsNumber()
    @IsNotEmpty({ message: 'O id categoria é obrigatório' })
    categoriaavaliacaoid: number;

    @IsNumber()
    @IsNotEmpty({ message: 'O id corrida é obrigatório' })
    corridaid: number;

}