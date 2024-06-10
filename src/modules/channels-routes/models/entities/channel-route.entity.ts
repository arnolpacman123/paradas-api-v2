import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LineString } from "geojson";
import { StopPointEntity } from "@modules/stops-points/models/entities/stop-point.entity";

@Entity({
    name: 'channels_routes'
})
export class ChannelRouteEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'LineString',
        srid: 4326
    })
    geom?: LineString;

    @Column({
        type: 'varchar',
        name: 'name',
    })
    name?: string;

    @Column({
        name: 'is_primary',
        type: 'boolean',
    })
    isPrimary?: boolean;

    // @OneToMany(() => StopPointEntity, stop_point => stop_point.channel_route)
    // stops_points: StopPointEntity[];
}