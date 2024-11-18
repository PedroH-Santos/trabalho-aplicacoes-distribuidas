import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleRepository } from './vehicle.repository';
import { VehicleController } from './vehicle.controller';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
  exports: [VehicleService],
})
export class VehicleModule {}
