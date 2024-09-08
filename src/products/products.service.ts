import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Product, Type } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { Comment } from 'src/comments/comments/entities/comment.entity';

const ITEMS_PER_PAGE = 20;
const COMMENTS_PER_PAGE = 10;

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create({
      name: createProductDto.name,
      material: createProductDto.material,
      category: createProductDto.category,
      type: createProductDto.type,
      price: createProductDto.price,
    });

    const features: Feature[] = createProductDto.features.map((str) => {
      const feature = new Feature();
      feature.description = str;
      feature.product = product;
      return feature;
    });

    product.features = features;

    const saved = await this.productsRepository.save(product);

    return { id: saved.id };
  }

  async findAll(page: number, type: Type, category: Category) {
    return await this.productsRepository.find({
      where: {
        type: type,
        category: category,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * page,
      relations: {
        features: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        features: true,
      },
    });

    if (!product) throw new NotFoundException('Product Not Found!');

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update({ id: id }, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository.delete({ id: id });
  }

  findProductComments(id: string, page: number) {
    console.log(id);
    return this.commentsRepository.find({
      where: {
        product: {
          id: id,
        },
      },
      take: COMMENTS_PER_PAGE,
      skip: COMMENTS_PER_PAGE * page,
    });
  }
}
