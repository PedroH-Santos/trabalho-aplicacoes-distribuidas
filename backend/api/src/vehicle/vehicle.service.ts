import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { VehicleDto } from 'dtos/entities/vehicleDto';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async insertVehicle(data: VehicleDto) {
    try {
      return await this.vehicleRepository.insertVehicle(data);
    } catch (ex) {
      console.error(ex);
      throw new Error('Não foi possível inserir o veículo.');
    }
  }

  async updateVehicle(data: VehicleDto) {
    try {
      return await this.vehicleRepository.updateVehicle(data);
    } catch (ex) {
      console.error(ex);
      throw new Error('Não foi possível atualizar o veículo.');
    }
  }

  async deleteVehicleById(id: number) {
    try {
      return await this.vehicleRepository.deleteVehicleById(id);
    } catch (ex) {
      console.error(ex);
      throw new Error('Não foi possível remover o veículo.');
    }
  }

  async getVehicleById(id: number) {
    return await this.vehicleRepository.getVehicleById(id);
  }
  
  getAllVehicle
  async getVehicleByIdClient(id: number) {
    return await this.vehicleRepository.getVehicleByIdClient(id);
  }
}
