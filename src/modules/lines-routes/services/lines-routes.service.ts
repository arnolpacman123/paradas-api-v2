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
            SELECT distinct(name)
            FROM lines_routes
            WHERE ST_DistanceSphere(
                geom,
                ST_MakePoint(${coordinate[0]}, ${coordinate[1]})
            ) <= 100
        `);
    }
}
