import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RaceService } from './race.service';
import { CalculateDistanceRequestDto } from 'dtos/requests/calculateDistanceRequestDto';
import { SupabaseGuard } from 'src/supabase';
import { StartRaceRequestDto } from 'dtos/requests/startRaceRequestDto';

@Controller('race')
//@UseGuards(SupabaseGuard)
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get('calculate-distance')
  async getRace(@Query() data: CalculateDistanceRequestDto) {
    try {
      const result = await this.raceService.getFullConsumedRace(data);
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  @Post('started')
  async insertRace(@Body() data: StartRaceRequestDto) {
    try {
      const result = await this.raceService.startRace(data);
      return result;
    } catch (ex) {
      throw ex;
    }
  }
  @Put('finished/:id')
  async finishRace(@Param('id') id: number) {
    try {
      const result = await this.raceService.finishRace(id);
      return result;
    } catch (ex) {
      throw ex;
    }
  }
}
