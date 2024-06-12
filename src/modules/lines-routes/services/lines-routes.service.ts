import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LineRouteEntity } from '@modules/lines-routes/models/entities/line-route.entity';
import { Repository } from 'typeorm';
import { NearestLinesRoutesDto } from '@modules/lines-routes/models/dto/nearest-lines-routes.dto';
import { FindLineRouteDto } from '@modules/lines-routes/models/dto/find-line-route.dto';

@Injectable()
export class LinesRoutesService {
  constructor(
    @InjectRepository(LineRouteEntity)
    private readonly lineRouteRepository: Repository<LineRouteEntity>,
  ) {}

  async findAll() {
    return await this.lineRouteRepository.find();
  }

  async findOne(id: number) {
    return await this.lineRouteRepository.findOne({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.lineRouteRepository.find({
      where: { name },
    });
  }

  async findNearestLinesRoutes(nearestLinesRoutesDto: NearestLinesRoutesDto) {
    const { coordinate } = nearestLinesRoutesDto;
    let names = await this.lineRouteRepository.query(`
            WITH ordered_routes AS (
                SELECT lr.name
                        FROM (
                    SELECT lr.name, 
                    MIN(ST_DistanceSphere(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326))) AS distance
                    FROM lines_routes lr
                    WHERE ST_DWithin(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326), 0.001)
                    GROUP BY lr.name
                    ORDER BY distance ASC
                ) AS lr
            )
            SELECT ln.*
            FROM lines_names ln
            JOIN ordered_routes ordr ON ln.name = ordr.name
            ORDER BY array_position(array(SELECT name FROM ordered_routes), ln.name);
        `);
    if (names.length === 0) {
      names = await this.lineRouteRepository
        .query(
          `
                WITH ordered_routes AS (
                    SELECT lr.name
                    FROM (
                        SELECT lr.name,
                            MIN(ST_DistanceSphere(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326))) AS min_distance
                        FROM lines_routes lr
                        GROUP BY lr.name
                        ORDER BY min_distance ASC
                        LIMIT 18
                    ) AS lr
                )
                SELECT ln.*
                FROM lines_names ln
                JOIN ordered_routes ordr ON ln.name = ordr.name
                ORDER BY array_position(array(SELECT name FROM ordered_routes), ln.name);
            `,
        )
        .then((res) => {
          return res.map((item: Object) => {
            return {
              id: item['id'],
              name: item['name'],
              imageUrl: item['image_url'],
            };
          });
        });
    }
    return names;
  }

  async findLineRoute(findLineRouteDto: FindLineRouteDto) {
    const { name, ground } = findLineRouteDto;
    return await this.lineRouteRepository.findOne({
      where: { name, ground },
    });
  }
}
