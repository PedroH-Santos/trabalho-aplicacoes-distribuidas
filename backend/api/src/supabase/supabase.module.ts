import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';
import { SupabaseController } from './supabase.controller';
import { SupabaseService } from './supabase.service';
import { ClientService } from 'src/client/client.service';
import { ClientRepository } from 'src/client/client.repository';

@Module({
  imports: [ConfigModule],
  controllers: [SupabaseController],
  providers: [SupabaseService, SupabaseStrategy, ClientService, ClientRepository],
})
export class SupabaseModule { }