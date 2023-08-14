import { Module } from "@nestjs/common";
import { LinesRoutesController } from "./controllers/lines-routes.controller";
import { LinesRoutesService } from "./services/lines-routes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LineRouteEntity } from "@modules/lines-routes/models/entities/line-route.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ LineRouteEntity ])
  ],
  controllers: [ LinesRoutesController ],
  providers: [ LinesRoutesService ]
})
export class LinesRoutesModule {
}
