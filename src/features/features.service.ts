import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {}

  async create(createFeatureDto: CreateFeatureDto) {
    const product = new Product();
    product.id = createFeatureDto.productId;

    const feature = this.featureRepository.create(createFeatureDto);

    feature.product = product;

    const saved = await this.featureRepository.save(feature);

    return { id: saved.id };
  }

  findOne(id: string) {
    const feature = this.featureRepository.findOneBy({ id });

    if (!feature) throw new NotFoundException('Feature not Found!');

    return feature;
  }

  update(id: string, updateFeatureDto: UpdateFeatureDto) {
    return this.featureRepository.update(id, updateFeatureDto);
  }

  remove(id: string) {
    return this.featureRepository.delete({ id });
  }
}
