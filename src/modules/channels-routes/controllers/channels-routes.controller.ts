import { Controller, Get } from '@nestjs/common';
import { ChannelsRoutesService } from "@modules/channels-routes/services/channels-routes.service";

@Controller('channels-routes')
export class ChannelsRoutesController {

    constructor(
        private readonly channelsRoutesService: ChannelsRoutesService,
    ) {
    }

    @Get()
    async findAll() {
        return await this.channelsRoutesService.findAll();
    }

}
