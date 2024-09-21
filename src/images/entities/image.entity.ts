import { Stock } from 'src/stock/entities/stock.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bucketKey: string;

  @ManyToOne(() => Stock, (stock) => stock.images, { nullable: false })
  stock: Stock;
}
