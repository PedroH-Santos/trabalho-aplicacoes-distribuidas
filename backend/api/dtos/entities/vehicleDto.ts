import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class VehicleDto {
  @IsNumber()
  @IsOptional()
  veiculoid: number;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString({ message: 'O tipo do veículo deve ser uma string' })
  @IsNotEmpty({ message: 'O tipo do veículo é obrigatório' })
  tipo: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O consumo médio é obrigatório' })
  consumomedio: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O tipo do combustível é obrigatório' })
  combustivelid: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O dono do veículo é obrigatório' })
  clienteid: number;
}