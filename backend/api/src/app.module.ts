import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RaceModule } from './race/race.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase';
import { GoogleModule } from './google/google.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { FuelModule } from './fuel/fuel.module';
import { ClientModule } from './client/client.module';
import { RatingService } from './rating/rating.service';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [RaceModule, ClientModule, GoogleModule, VehicleModule, RatingModule, SupabaseModule, FuelModule,
  ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}