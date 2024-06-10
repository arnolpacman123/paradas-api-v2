import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LineNameEntity } from '@modules/lines-names/models/entities/line-name.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinesNamesService {
  constructor(
    @InjectRepository(LineNameEntity)
    private readonly linesNamesRepository: Repository<LineNameEntity>,
  ) {}

  async findAll(): Promise<LineNameEntity[]> {
    return this.linesNamesRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }
}
