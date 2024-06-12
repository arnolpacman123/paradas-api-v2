import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "geojson";

@Entity({
    name: 'stops_points'
})
export class StopPointEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    geom: Point;
}