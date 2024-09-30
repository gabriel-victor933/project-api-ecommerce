import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  async create(createProductTypeDto: CreateProductTypeDto) {
    const productType = this.productTypeRepository.create({
      type: createProductTypeDto.type,
    });

    const { id } = await this.productTypeRepository.save(productType);

    return { id };
  }

  findAll() {
    return this.productTypeRepository.find({ take: 50 });
  }

  remove(id: string) {
    return this.productTypeRepository.delete({ id });
  }
}
