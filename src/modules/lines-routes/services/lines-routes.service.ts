import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LineRouteEntity} from "@modules/lines-routes/models/entities/line-route.entity";
import {Repository} from "typeorm";
import {NearestLinesRoutesDto} from "@modules/lines-routes/models/dto/nearest-lines-routes.dto";

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
            where: {id}
        });
    }

    async findByName(name: string) {
        return await this.lineRouteRepository.find({
            where: {name}
        });
    }

    async findNearestLinesRoutes(nearestLinesRoutesDto: NearestLinesRoutesDto) {
        const {coordinate} = nearestLinesRoutesDto;
        return await this.lineRouteRepository.query(`
            SELECT name
             FROM lines_names 
             WHERE name IN (SELECT name FROM (SELECT *, ST_DistanceSphere(
            geom,
            ST_GeomFromText('POINT(${coordinate[0]} ${coordinate[1]})', 4326)
            ) AS distance
            FROM lines_routes
            ORDER BY distance ASC
            LIMIT 8) AS nearest_lines_routes)
        `);
    }
}
