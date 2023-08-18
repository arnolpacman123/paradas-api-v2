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
        // Encontrar el nombre de las líneas (una sola vez una línea) que estén a menos de 400 metros de la ubicación y ordenarlas por distancia
        return await this.lineRouteRepository.query(`
            SELECT DISTINCT (lr.name), ST_DistanceSphere(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326)) AS distance
            FROM lines_routes lr
            WHERE ST_DWithin(lr.geom, ST_SetSRID(ST_MakePoint(${coordinate[0]}, ${coordinate[1]}), 4326), 0.002)
            ORDER BY distance ASC;
        `);
    }
}
