import { Body, Controller, Post } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { AuthDto } from 'dtos/requests/authDto';
import { signUpCliente } from 'dtos/requests/signUpCliente';
import { ValidationPipe } from 'src/infra/ValidationPipe';

@Controller('auth')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('/signup')
  async signup(@Body(new ValidationPipe()) obj: signUpCliente) {
    return await this.supabaseService.signUp(obj);
  }

  @Post('/signin')
  async signin(@Body(new ValidationPipe()) obj: AuthDto) {
    return await this.supabaseService.signIn(obj.email, obj.password);
  }

  @Post('/signout')
  async signout() {
    this.supabaseService.signOut();
    return { message: 'Usuário deslogado' };
  }
}
