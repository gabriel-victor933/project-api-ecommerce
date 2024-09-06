import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Type {
  CASUAL = 'Casual',
  FORMAL = 'Formal',
  PARTY = 'Party',
  BUSINESS = 'business',
}

export enum Category {
  MENSWEAR = 'Menswear',
  WOMENSWEAR = 'Womenswear',
  KIDSWEAR = 'Kidswear',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  material: string;

  @Column({ type: 'int' })
  price: number;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
