import { Controller, Get, Query } from '@nestjs/common';
import { StopsPointsService } from "@modules/stops-points/services/stops-points.service";

@Controller('stops-points')
export class StopsPointsController {

    constructor(
        private readonly stopsPointsService: StopsPointsService,
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
