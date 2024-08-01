import { Module } from '@nestjs/common';
import { ParkingsService } from './services/parkings.service';
import { ParkingsGateway } from './gateways/parkings.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingEntity } from './models/entities/parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingEntity])],
  providers: [ParkingsService, ParkingsGateway],
})
export class ParkingsModule {}
