import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const options: TypeOrmModuleOptions = {
  type: "postgres",
  host: "20.195.213.69",
  username: "arnolguevara21",
  password: "aspirine",
  database: "transport_channels_db",
  entities: [ __dirname + "/../**/*.entity{.ts,.js}" ],
  autoLoadEntities: true
};