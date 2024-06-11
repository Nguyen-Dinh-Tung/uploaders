import { Column, Entity } from 'typeorm';
import { IdNumberDeleteDateEntity, NotNullColum } from '../database';

@Entity('images')
export class ImageEntity extends IdNumberDeleteDateEntity {
  @NotNullColum({ unique: true })
  name: string;

  @NotNullColum({ type: 'text', nullable: false })
  imageURL: string;
}
