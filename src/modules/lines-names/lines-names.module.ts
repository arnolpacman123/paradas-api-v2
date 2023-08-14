import { Module } from "@nestjs/common";
import { LinesNamesService } from "./services/lines-names.service";
import { LinesNamesController } from "./controllers/lines-names.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LineNameEntity } from "@modules/lines-names/models/entities/line-name.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LineNameEntity
    ])
  ],
  providers: [ LinesNamesService ],
  controllers: [ LinesNamesController ]
})
export class LinesNamesModule {
}
