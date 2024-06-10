import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'lines_names',
})
export class LineNameEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name?: string;

  @Column({
    type: 'varchar',
    name: 'image_url',
  })
  imageUrl?: string;
}
