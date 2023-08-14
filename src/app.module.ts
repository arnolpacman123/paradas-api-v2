import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LinesRoutesModule } from "@modules/lines-routes/lines-routes.module";
import { LinesNamesModule } from "@modules/lines-names/lines-names.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { options } from "@config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    LinesRoutesModule,
    LinesNamesModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ]
})
export class AppModule {
}
