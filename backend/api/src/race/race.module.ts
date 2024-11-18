import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { ConfigService } from '@nestjs/config';
import { FuelModule } from 'src/fuel/fuel.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { GoogleModule } from 'src/google/google.module';
import { RaceRepository } from './race.repository';

@Module({
  imports: [FuelModule, VehicleModule, GoogleModule],
  controllers: [RaceController],
  providers: [RaceService, ConfigService, RaceRepository],
})
export class RaceModule { }