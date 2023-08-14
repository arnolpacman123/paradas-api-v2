import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LineString } from "geojson";

@Entity({
  name: "lines_routes"
})
export class LineRouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "geometry",
    spatialFeatureType: "LineString",
    srid: 4326
  })
  geom: LineString;

  @Column()
  name: string;

  @Column()
  ground: string;

  @Column()
  direction: string;
}