import { Controller, Get, Query } from '@nestjs/common';
import { BusStopsService } from "@modules/bus-stops/services/bus-stops.service";

@Controller('bus-stops')
export class BusStopsController {

    constructor(
        private readonly stopsPointsService: BusStopsService,
    ) {
    }

    @Get()
    async findAll() {
        return await this.stopsPointsService.findAll();
    }

    @Get('find-with-coordinates')
    async findWithCoordinates(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
    ) {
        return await this.stopsPointsService.findWithCoordinates(lat, lng);
    }
}
