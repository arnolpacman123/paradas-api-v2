import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingEntity } from '../models/entities/parking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingsService {
  constructor(
    @InjectRepository(ParkingEntity)
    private readonly parkingsRepository: Repository<ParkingEntity>,
  ) {}

  async findAll(): Promise<ParkingEntity[]> {
    return await this.parkingsRepository.find({
      order: {
        id: 'ASC',
      },
      select: [
        'id',
        'geom',
        'isFull',
        'startAttention',
        'endAttention',
        'imageUrl',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
