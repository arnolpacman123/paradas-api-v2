import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LinesRoutesModule } from "@modules/lines-routes/lines-routes.module";
import { LinesNamesModule } from "@modules/lines-names/lines-names.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { options } from "@config/orm.config";
import { ChannelsRoutesModule } from './modules/channels-routes/channels-routes.module';
import { StopsPointsModule } from './modules/stops-points/stops-points.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    LinesRoutesModule,
    LinesNamesModule,
    ChannelsRoutesModule,
    StopsPointsModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ]
})
export class AppModule {
}
