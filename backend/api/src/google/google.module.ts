import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [GoogleService, ConfigService],
  exports: [GoogleService]
})
export class GoogleModule { }