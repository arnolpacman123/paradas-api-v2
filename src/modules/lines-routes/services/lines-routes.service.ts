import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LineRouteEntity } from "@modules/lines-routes/models/entities/line-route.entity";
import { Repository } from "typeorm";
import { CompareLinestringsDto } from "@modules/lines-routes/models/dto/compare-linestrings.dto";

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


  async compareLinestrings(compareLinestringsDto: CompareLinestringsDto) {
    const { coordinates } = compareLinestringsDto;
    const linestring = `LINESTRING(${ coordinates.map((coordinate) => `${ coordinate[0] } ${ coordinate[1] }`).join(",") })`;
    console.log(linestring);

    return await this.lineRouteRepository.query(`
        SELECT *,
               ST_AsText(ST_ClosestPoint(ST_GeomFromText('${ linestring }'),
                                         ST_GeomFromText(linestring))) AS closest_point
        FROM lines_routes
    `).then((response) => {
      return response.map((lineRoute) => {
        return {
          ...lineRoute,
          closest_point: lineRoute.closest_point.replace("POINT(", "").replace(")", "").split(" ").map((coordinate) => +coordinate)
        };
      });
    });
  }
}
