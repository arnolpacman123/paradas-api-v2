import { Module } from '@nestjs/common';
import { BusStopsService } from '@modules/bus-stops/services/bus-stops.service';
import { BusStopsController } from '@modules/bus-stops/controllers/bus-stops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStopEntity } from '@modules/bus-stops/models/entities/bus-stop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusStopEntity])],
  providers: [BusStopsService],
  controllers: [BusStopsController],
})
export class BusStopsModule {}
