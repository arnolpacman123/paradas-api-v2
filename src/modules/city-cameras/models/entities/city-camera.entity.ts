import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity({
  name: 'city_cameras',
})
export class CityCameraEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geom?: Point;

  @Column({
    type: 'varchar',
  })
  location?: string;
}
