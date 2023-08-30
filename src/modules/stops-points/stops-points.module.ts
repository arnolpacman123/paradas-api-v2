import { Module } from '@nestjs/common';
import { StopsPointsService } from './services/stops-points.service';
import { StopsPointsController } from './controllers/stops-points.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StopPointEntity } from "@modules/stops-points/models/entities/stop-point.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StopPointEntity,
        ]),
    ],
    providers: [ StopsPointsService ],
    controllers: [ StopsPointsController ]
})
export class StopsPointsModule {
}
