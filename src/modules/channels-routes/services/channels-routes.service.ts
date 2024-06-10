import { Injectable } from '@nestjs/common';
import { ChannelRouteEntity } from '@modules/channels-routes/models/entities/channel-route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsRoutesService {
  constructor(
    @InjectRepository(ChannelRouteEntity)
    private readonly channelRouteRepository: Repository<ChannelRouteEntity>,
  ) {}

  async findAll(): Promise<ChannelRouteEntity[]> {
    return await this.channelRouteRepository.find();
  }
}
