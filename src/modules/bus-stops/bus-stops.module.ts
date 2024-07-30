import { Module } from '@nestjs/common';
import { BusStopsService } from './services/bus-stops.service';
import { BusStopsController } from './controllers/bus-stops.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusStopsEntity } from "@modules/bus-stops/models/entities/bus-stops.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BusStopsEntity,
        ]),
    ],
    providers: [ BusStopsService ],
    controllers: [ BusStopsController ]
})
export class BusStopsModule {
}
