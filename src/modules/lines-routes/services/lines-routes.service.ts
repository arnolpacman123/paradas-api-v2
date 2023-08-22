import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LineRouteEntity } from "@modules/lines-routes/models/entities/line-route.entity";
import { Repository } from "typeorm";
import { NearestLinesRoutesDto } from "@modules/lines-routes/models/dto/nearest-lines-routes.dto";

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

    async findNearestLinesRoutes(nearestLinesRoutesDto: NearestLinesRoutesDto) {
        const { coordinate } = nearestLinesRoutesDto;
        let names = await this.lineRouteRepository.query(`
            SELECT lr.name, 
            MIN(ST_DistanceSphere(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326))) AS distance
            FROM lines_routes lr
            WHERE ST_DWithin(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326), 0.001)
            GROUP BY lr.name
            ORDER BY distance ASC;
        `);
        if (names.length === 0) {
            names = await this.lineRouteRepository.query(`
                SELECT 
                    lr.name, 
                    MIN(ST_DistanceSphere(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326))) AS min_distance
                FROM 
                    lines_routes lr
                GROUP BY 
                    lr.name
                ORDER BY 
                    min_distance ASC
                LIMIT 18;
            `);
        }
        return names;
    }
}
