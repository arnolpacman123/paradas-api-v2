import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ParkingEntity } from '../models/entities/parking.entity';
import { ParkingsService } from '../services/parkings.service';
import { Client } from 'pg';
import { Server, Socket } from 'socket.io';
import * as dotenv from 'dotenv';

dotenv.config();

@WebSocketGateway({
  namespace: 'parkings',
  cors: {
    origin: '*',
  },
})
export class ParkingsGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  parkings: ParkingEntity[] = [];
  client: Client;

  constructor(private readonly parkingsService: ParkingsService) {
    this.client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  async afterInit(_: any) {
    try {
      await this.client.connect();
      await this.client.query('LISTEN parkings_update');
      this.client.on('notification', async (_) => {
        this.parkings = await this.parkingsService.findAll();
        this.server.emit('update', this.parkings);
      });
    } catch (e) {
      console.error(e);
    }
  }

  async handleConnection(
    @ConnectedSocket() client: Socket,
    @MessageBody() ..._: any[]
  ) {
    this.parkings = await this.parkingsService.findAll();
    client.emit('update', this.parkings);
  }
}
