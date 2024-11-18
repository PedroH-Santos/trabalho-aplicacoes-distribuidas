import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, isString, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class signUpCliente {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsString()
  //@IsStrongPassword()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsDateString()
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  datanascimento: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone: string;

  @IsString()
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  uuid: string;
}