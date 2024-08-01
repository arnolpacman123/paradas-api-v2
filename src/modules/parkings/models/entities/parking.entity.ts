import {
  Column,
  CreateDateColumn,
  Entity,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'parkings',
})
export class ParkingEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id?: number;

  @Column({
    name: 'geom',
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geom?: Point;

  @Column({
    name: 'is_full',
    type: 'boolean',
  })
  isFull?: boolean;

  @Column({
    name: 'start_attention',
    type: 'text',
  })
  startAttention?: string;

  @Column({
    name: 'end_attention',
    type: 'text',
  })
  endAttention?: string;

  @Column({
    name: 'image_url',
    type: 'text',
  })
  imageUrl?: string;

  @Column({
    name: 'credential',
    type: 'text',
    unique: true,
  })
  credential?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
