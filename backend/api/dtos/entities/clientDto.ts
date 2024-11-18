import { Optional } from "@nestjs/common";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class ClientDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O id do cliente é obrigatório' })
  clienteid: number;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @IsString({ message: 'O email deve ser uma string' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @IsDateString()
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  datanascimento: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  @IsString({ message: 'O telefone deve ser uma string' })
  telefone: string;

  @IsString({ message: 'O CPF deve ser uma string' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O uuid é obrigatório' })
  @IsString({ message: 'O uuid deve ser uma string' })
  uuid: string;
}