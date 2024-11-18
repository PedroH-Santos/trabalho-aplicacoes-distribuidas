import { Module } from '@nestjs/common';
import { FuelRepository } from './fuel.repository';
import { FuelService } from './fuel.service';

@Module({
    controllers: [],
    providers: [FuelService, FuelRepository],
    exports: [FuelService]
})
export class FuelModule {}
