import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Sizes } from 'src/sizes/entities/size.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
  ) {}

  async create(createStockDto: CreateStockDto) {
    const product = new Product();
    product.id = createStockDto.productId;

    const sizes: Sizes[] = createStockDto.sizes.map((data) => {
      const size = new Sizes();

      size.quantity = data.quantity;
      size.size = data.size;

      return size;
    });

    const stock = this.stocksRepository.create({
      color: createStockDto.color,
      principal: createStockDto.principal,
    });

    stock.product = product;

    stock.sizes = sizes;

    const saved = await this.stocksRepository.save(stock);

    return { id: saved.id };
  }

  findAll() {
    return this.stocksRepository.find({
      relations: {
        images: true,
        sizes: true,
      },
      relationLoadStrategy: 'join',
    });
  }

  async findOne(id: string) {
    const stock = await this.stocksRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
        sizes: true,
      },
      relationLoadStrategy: 'join',
    });

    if (!stock) throw new NotFoundException('Stock not Found!');

    return stock;
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    return this.stocksRepository.update(id, updateStockDto);
  }

  remove(id: string) {
    return this.stocksRepository.delete({ id: id });
  }
}
