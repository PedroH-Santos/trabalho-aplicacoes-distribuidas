import { Injectable, NotFoundException } from '@nestjs/common';
import { FuelRepository } from './fuel.repository';

@Injectable()
export class FuelService {

    constructor(private readonly fuelRepository: FuelRepository) {}

    async getFuelById(id: number){

        try {
            return this.fuelRepository.getFuelById(id);
        }catch(ex) {
            if (ex instanceof NotFoundException) {
                throw ex;
            } else {

                throw new Error('An unexpected error occurred');
            }
        }
    }

}
