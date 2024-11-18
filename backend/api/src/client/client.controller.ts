import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { SupabaseGuard } from 'src/supabase';
import { ClientDto } from 'dtos/entities/clientDto';
import { ValidationPipe } from 'src/infra/ValidationPipe';

@Controller('client')
@UseGuards(SupabaseGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Put()
  async updateClient(@Body(new ValidationPipe()) data: ClientDto) {
    const res = await this.clientService.updateClient(data);
    return res;
  }

  @Get('uuid/:uuid')
  async getClientByUuid(@Param('uuid') uuid: string) {
    return await this.clientService.getClientByUuid(uuid);
  }

  @Get('id/:id')
  async getClientById(@Param('id') id: number) {
    return await this.clientService.getClientById(id);
  }
}
