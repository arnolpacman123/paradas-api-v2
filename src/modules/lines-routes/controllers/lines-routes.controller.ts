import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {LinesRoutesService} from "@modules/lines-routes/services/lines-routes.service";
import {LineString} from "geojson";
import {CompareLinestringsDto} from "@modules/lines-routes/models/dto/compare-linestrings.dto";
import {NearestLinesRoutesDto} from "@modules/lines-routes/models/dto/nearest-lines-routes.dto";

@Controller("lines-routes")
export class LinesRoutesController {
    constructor(
        private readonly linesRoutesService: LinesRoutesService
    ) {
    }

    @Get()
    async findAll() {
        return await this.linesRoutesService.findAll();
    }

    @Get("/:id")
    async findOne(@Param("id") id: number) {
        return await this.linesRoutesService.findOne(+id);
    }

    @Get("/find-by-name/:name")
    async findByName(@Param("name") name: string) {
        return await this.linesRoutesService.findByName(name);
    }

    @Post("/find-nearest-lines-routes")
    async findNearestLinesRoutes(@Body() nearestLinesRoutesDto: NearestLinesRoutesDto) {
        return await this.linesRoutesService.findNearestLinesRoutes(nearestLinesRoutesDto);
    }
}
