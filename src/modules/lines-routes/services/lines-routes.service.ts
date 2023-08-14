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
    const lineRoute = await this.lineRouteRepository.findOne({
      where: { id }
    });
    lineRoute.geom.coordinates = lineRoute.geom.coordinates.map((coordinate) => {
      return coordinate.reverse();
    });
    return lineRoute;
  }

  async findByName(name: string) {
    return await this.lineRouteRepository.find({
      where: { name }
    });
  }


}
