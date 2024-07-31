import { Controller, Get } from '@nestjs/common';
import { CityCamerasService } from '@modules/city-cameras/services/city-cameras.service';

@Controller('city-cameras')
export class CityCamerasController {
  constructor(private readonly cityCamerasService: CityCamerasService) {}

  @Get()
  async findAll() {
    return await this.cityCamerasService.findAll();
  }
}
