import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: 'postgresql-arnolguevara21.alwaysdata.net',
  username: 'arnolguevara21',
  password: 'Aspirine217021220',
  database: 'arnolguevara21_smtt_channels_transports_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
};
