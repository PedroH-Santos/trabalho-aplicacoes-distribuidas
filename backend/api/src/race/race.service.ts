import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EmissionRequestDto } from 'dtos/requests/emissionRequestDto';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { FuelService } from 'src/fuel/fuel.service';
import { CalculateDistanceRequestDto } from 'dtos/requests/calculateDistanceRequestDto';
import { GoogleService } from 'src/google/google.service';
import { StartRaceRequestDto } from 'dtos/requests/startRaceRequestDto';
import { RaceRepository } from './race.repository';

@Injectable()
export class RaceService {
    private QUANTITY_LITTERS_PER_GALLON: number = 3.785;

    constructor(private readonly fuelService: FuelService,
        private readonly vehicleService: VehicleService,
        private readonly googleService: GoogleService,
        private readonly raceRepository: RaceRepository
    ) { }

    async getEmissionConsumed(request: EmissionRequestDto) {


        try {
            const vehicle = await this.vehicleService.getVehicleById(request.idVehicle);
            const fuel = await this.fuelService.getFuelById(vehicle.combustivelid);


            const countFuelConsumed = request.distance / vehicle.consumomedio;
            const countGallonsConsumed = countFuelConsumed / this.QUANTITY_LITTERS_PER_GALLON;
            const countKgConsumed = countGallonsConsumed * fuel.co2kgporgalao;
            return {
                emission: countKgConsumed,
                fuelConsumed: countFuelConsumed,
            };
        } catch (ex) {
            if (ex instanceof NotFoundException) {
                throw ex;
            } else {

                throw new Error('An unexpected error occurred');
            }
        }
    }

    async getFullConsumedRace(request: CalculateDistanceRequestDto){
        try {
            const responseGoogle = await this.googleService.calculateDistance(request);
            const requestEmission: EmissionRequestDto = {
                distance: parseFloat((responseGoogle.distance.value / 1000).toFixed(2)),
                idVehicle: request.idVehicle
            };
            const responseEmission = await this.getEmissionConsumed(requestEmission);

            return {
                distance: responseGoogle.distance,
                duration: responseGoogle.duration,
                waypoints: responseGoogle.waypoints,
                emission: responseEmission.emission,
                fuelConsumed: responseEmission.fuelConsumed
            }
        }catch(ex) {
            if (ex instanceof NotFoundException) {
                throw ex;
            } else {

                throw new Error('An unexpected error occurred');
            }
        }
    }

    async startRace(request: StartRaceRequestDto){
        try {

            var races = await this.raceRepository.getRacesByClientId(request.clientId, "CREATED");
            if (races.length > 0) {
                throw new BadRequestException('Não é possivel iniciar ao mesmo tempo mais de uma corrida');
            }
            await this.raceRepository.insertStartedRace(request);

            var race = await this.raceRepository.getLastRace();
            return race;
        
        } catch (ex) {
            if (ex instanceof BadRequestException) {
                throw ex;
            } else {

                throw new Error('An unexpected error occurred');
            }
        }
    }

    async finishRace(id: number) {
        try {

            await this.raceRepository.updateRaceStatusToFinished(id);
            var race = await this.raceRepository.getLastRace();
            return race;
        } catch (ex) {
            if (ex instanceof BadRequestException) {
                throw ex;
            } else {

                throw new Error('An unexpected error occurred');
            }
        }
    }
    
}
