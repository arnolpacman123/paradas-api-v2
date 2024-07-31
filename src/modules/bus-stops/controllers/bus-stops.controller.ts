import { Controller, Get, Query } from '@nestjs/common';
import { BusStopsService } from "@modules/bus-stops/services/bus-stops.service";

@Controller('bus-stops')
export class BusStopsController {

    constructor(
        private readonly busStopsService: BusStopsService,
    ) {
    }

    @Get()
    async findAll() {
        return await this.busStopsService.findAll();
    }

    @Get('find-with-coordinates')
    async findWithCoordinates(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
    ) {
        return await this.busStopsService.findWithCoordinates(lat, lng);
    }
}
