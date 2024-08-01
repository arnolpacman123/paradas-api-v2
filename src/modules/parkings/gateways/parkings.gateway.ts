import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ParkingEntity } from '../models/entities/parking.entity';
import { ParkingsService } from '../services/parkings.service';
import { Client } from 'pg';
import { Socket, Server } from 'socket.io';
import * as dotenv from 'dotenv';

dotenv.config();

@WebSocketGateway({
  namespace: 'parkings',
  cors: {
    origin: '*',
  },
})
export class ParkingsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  parkings: ParkingEntity[] = [];

  constructor(private readonly parkingsService: ParkingsService) {
    this.parkingsService.findAll().then((parkings) => {
      this.parkings = parkings;
    });
  }

  async afterInit(server: any) {
    this.parkings = await this.parkingsService.findAll();
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    try {
      await client.connect();
      await client.query('LISTEN parkings_update');
      client.on('notification', async (_) => {
        this.parkings = await this.parkingsService.findAll();
        server.emit('update', this.parkings);
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleConnection(
    @ConnectedSocket() client: Socket,
    @MessageBody() ..._: any[]
  ) {
    client.broadcast.emit('connected');
    this.server.to(client.id).emit('update', this.parkings);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('disconnected');
  }
}
