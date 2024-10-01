import { Stock } from 'src/stock/entities/stock.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

@Entity()
@Index(['stock', 'size'], { unique: true })
export class Sizes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ nullable: false })
  size: Size;

  @ManyToOne(() => Stock, (stock) => stock.sizes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  stock: Stock;
}
