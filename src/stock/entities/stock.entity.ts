import { Images } from 'src/images/entities/images.entity';
import { Product } from 'src/products/entities/product.entity';
import { Sizes } from 'src/sizes/entities/size.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['product', 'color'], { unique: true })
//partial index: only one true principal attribute per productId.
@Index(['product'], { unique: true, where: '"principal"=true' })
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false, default: false })
  principal: boolean;

  @ManyToOne(() => Product, (product) => product.comments, { nullable: false })
  product: Product;

  @OneToMany(() => Images, (image) => image.stock, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  images: Images[];

  @OneToMany(() => Sizes, (size) => size.stock, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  sizes: Sizes[];
}
