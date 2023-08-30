import { Module } from '@nestjs/common';
import { ChannelsRoutesController } from './controllers/channels-routes.controller';
import { ChannelsRoutesService } from './services/channels-routes.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelRouteEntity } from "@modules/channels-routes/models/entities/channel-route.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ChannelRouteEntity,
        ])
    ],
    controllers: [ ChannelsRoutesController ],
    providers: [ ChannelsRoutesService ]
})
export class ChannelsRoutesModule {
}
