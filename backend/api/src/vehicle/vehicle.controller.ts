import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { SupabaseGuard } from 'src/supabase';
import { VehicleDto } from 'dtos/entities/vehicleDto';
import { ValidationPipe } from 'src/infra/ValidationPipe';

@Controller('vehicle')
//@UseGuards(SupabaseGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async insertVehicle(@Body(new ValidationPipe()) data: VehicleDto) {
    const res = await this.vehicleService.insertVehicle(data);
    return res;
  }

  @Put()
  async updateVehicle(@Body(new ValidationPipe()) data: VehicleDto) {
    const res = await this.vehicleService.updateVehicle(data);
    return res;
  }

  @Delete(':id')
  async deleteVehicleById(@Param('id') id: number) {
    await this.vehicleService.deleteVehicleById(id);
    return { message: 'Veículo removido com sucesso' };
  }

  @Get(':id')
  async getVehicleById(@Param('id') id: number) {
    return await this.vehicleService.getVehicleById(id);
  }

  @Get('client/:idClient')
  async getVehicleByIdClient(@Param('idClient') id: number) {
    return await this.vehicleService.getVehicleByIdClient(id);
  }
}
 