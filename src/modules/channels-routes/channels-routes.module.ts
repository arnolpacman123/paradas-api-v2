import { Module } from '@nestjs/common';
import { ChannelsRoutesController } from '@modules/channels-routes/controllers/channels-routes.controller';
import { ChannelsRoutesService } from '@modules/channels-routes/services/channels-routes.service';
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
