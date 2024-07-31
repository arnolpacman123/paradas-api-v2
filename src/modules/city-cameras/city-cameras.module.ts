import { Module } from '@nestjs/common';
import { CityCamerasController } from './controllers/city-cameras.controller';
import { CityCamerasService } from './services/city-cameras.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityCameraEntity } from './models/entities/city-camera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityCameraEntity])],
  controllers: [CityCamerasController],
  providers: [CityCamerasService],
})
export class CityCamerasModule {}
