import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LinesRoutesModule } from "@modules/lines-routes/lines-routes.module";
import { LinesNamesModule } from "@modules/lines-names/lines-names.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { options } from "@config/orm.config";
import { ChannelsRoutesModule } from './modules/channels-routes/channels-routes.module';
import { BusStopsModule } from '@modules/bus-stops/bus-stops.module';
import { CityCamerasModule } from './modules/city-cameras/city-cameras.module';
import { ParkingsModule } from './modules/parkings/parkings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    LinesRoutesModule,
    LinesNamesModule,
    ChannelsRoutesModule,
    BusStopsModule,
    CityCamerasModule,
    ParkingsModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ]
})
export class AppModule {
}
