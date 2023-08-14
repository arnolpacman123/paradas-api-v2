import { Controller, Get, Param } from "@nestjs/common";
import { LinesRoutesService } from "@modules/lines-routes/services/lines-routes.service";

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
}
