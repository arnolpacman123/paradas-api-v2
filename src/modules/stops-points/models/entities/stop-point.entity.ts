import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "geojson";
import { ChannelRouteEntity } from "@modules/channels-routes/models/entities/channel-route.entity";

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

    // @ManyToOne(() => ChannelRouteEntity, channel_route => channel_route.stops_points)
    // @JoinColumn({ name: 'channel_route_id' })
    // channel_route: ChannelRouteEntity;
}