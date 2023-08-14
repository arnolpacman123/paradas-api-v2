import { Controller, Get } from "@nestjs/common";
import { LinesNamesService } from "@modules/lines-names/services/lines-names.service";

@Controller("lines-names")
export class LinesNamesController {
  constructor(
    private readonly linesNamesService: LinesNamesService
  ) {
  }

  @Get()
  async findAll() {
    return await this.linesNamesService.findAll();
  }
}
