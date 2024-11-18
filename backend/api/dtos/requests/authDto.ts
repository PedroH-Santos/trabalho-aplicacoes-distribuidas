import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class AuthDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    email: string;

    @IsString()
    //@IsStrongPassword()
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    password: string;

}