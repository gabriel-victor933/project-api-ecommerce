import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  person: string;

  @Column({ nullable: false })
  comment: string;

  @Column({ nullable: false, type: 'int' })
  stars: number;

  @ManyToOne(() => Product, (product) => product.comments, { nullable: false })
  product: Product;
}
