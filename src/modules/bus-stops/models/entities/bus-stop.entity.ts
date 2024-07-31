import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity({
  name: 'bus_stops',
})
export class BusStopEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geom?: Point;
}
