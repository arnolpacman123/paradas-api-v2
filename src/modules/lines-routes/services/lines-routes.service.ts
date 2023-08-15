import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LineRouteEntity } from "@modules/lines-routes/models/entities/line-route.entity";
import { Repository } from "typeorm";

@Injectable()
export class LinesRoutesService {

  constructor(
    @InjectRepository(LineRouteEntity)
    private readonly lineRouteRepository: Repository<LineRouteEntity>
  ) {
  }

  async findAll() {
    return await this.lineRouteRepository.find();
  }

  async findOne(id: number) {
    return await this.lineRouteRepository.findOne({
      where: { id }
    });
  }

  async findByName(name: string) {
    return await this.lineRouteRepository.find({
      where: { name }
    });
  }
}
