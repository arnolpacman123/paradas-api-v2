import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { StopPointEntity } from "@modules/stops-points/models/entities/stop-point.entity";
import { Repository } from "typeorm";

@Injectable()
export class StopsPointsService {

    constructor(
        @InjectRepository(StopPointEntity)
        private readonly stopPointRepository: Repository<StopPointEntity>,
    ) {
    }

    async findWithCoordinates(lat: number, lng: number) {
        return await this.stopPointRepository
            .createQueryBuilder('stop_point')
            .select()
            .where('ST_Contains(stop_point.geom, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326))', { lat, lng })
            .leftJoinAndSelect('stop_point.channel_route', 'channel_route')
            .getOne();
    }

    async findAll() {
        return await this.stopPointRepository.find();
    }
}
