import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LineString } from 'geojson';
import { BusStopEntity } from '@modules/bus-stops/models/entities/bus-stop.entity';

@Entity({
  name: 'channels_routes',
})
export class ChannelRouteEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'geometry',
    name: 'geom',
    spatialFeatureType: 'LineString',
    srid: 4326,
  })
  geom?: LineString;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name?: string;

  @Column({
    type: 'boolean',
    name: 'is_primary',
  })
  isPrimary?: boolean;

  @Column({
    type: 'varchar',
    name: 'color',
  })
  color?: string;

  // @OneToMany(() => BusStopsEntity, stop_point => stop_point.channel_route)
  // stops_points: BusStopsEntity[];
}
