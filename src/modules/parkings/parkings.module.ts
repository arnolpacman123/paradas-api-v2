import { Module } from '@nestjs/common';
import { ParkingsService } from '@modules/parkings/services/parkings.service';
import { ParkingsGateway } from '@modules/parkings/gateways/parkings.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingEntity } from '@modules/parkings/models/entities/parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingEntity])],
  providers: [ParkingsService, ParkingsGateway],
})
export class ParkingsModule {}
