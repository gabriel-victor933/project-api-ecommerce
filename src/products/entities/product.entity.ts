import { Comment } from 'src/comments/comments/entities/comment.entity';
import { Feature } from 'src/features/entities/feature.entity';
import { Stock } from 'src//stock/entities/stock.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductType } from 'src/product-type/entities/product-type.entity';

export enum Category {
  MENSWEAR = 'Menswear',
  WOMENSWEAR = 'Womenswear',
  KIDSWEAR = 'Kidswear',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  material: string;

  @Column({ type: 'int' })
  price: number;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Feature, (feature) => feature.product, { cascade: true })
  features: Feature[];

  @OneToMany(() => Comment, (Comment) => Comment.product)
  comments: Comment[];

  @OneToMany(() => Stock, (Stock) => Stock.product)
  stocks: Stock[];

  @ManyToOne(() => ProductType, (type) => type.products, { nullable: false })
  productType: ProductType;
}
