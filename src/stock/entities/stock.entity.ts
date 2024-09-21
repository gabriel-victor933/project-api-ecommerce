import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false })
  size: Size;

  @Column({ nullable: false, default: false })
  principal: boolean;

  @ManyToOne(() => Product, (product) => product.comments, { nullable: false })
  product: Product;

  @OneToMany(() => Image, (image) => image.stock, { cascade: true })
  images: Image[];
}
