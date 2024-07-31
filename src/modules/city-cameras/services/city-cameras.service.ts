import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityCameraEntity } from '../models/entities/city-camera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityCamerasService {
  constructor(
    @InjectRepository(CityCameraEntity)
    private readonly cityCamerasRepository: Repository<CityCameraEntity>,
  ) {}

  async findAll() {
    return await this.cityCamerasRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }
}
