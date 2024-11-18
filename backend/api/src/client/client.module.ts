import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { ClientController } from './client.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, ConfigService],
  exports: [ClientService],
})
export class ClientModule {}
