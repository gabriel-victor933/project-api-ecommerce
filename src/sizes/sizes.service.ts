import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sizes } from './entities/size.entity';
import { Repository } from 'typeorm';
import { Stock } from 'src/stock/entities/stock.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Sizes) private sizesRepository: Repository<Sizes>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    const stock = new Stock();
    stock.id = createSizeDto.stockId;

    const size = this.sizesRepository.create({
      quantity: createSizeDto.quantity,
      size: createSizeDto.size,
    });

    size.stock = stock;

    const { id } = await this.sizesRepository.save(size);

    return { id };
  }

  async remove(id: string) {
    return await this.sizesRepository.delete({ id });
  }
}
