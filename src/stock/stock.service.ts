import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
  ) {}

  async create(
    createStockDto: CreateStockDto,
    images: Array<Express.Multer.File>,
  ) {
    const product = new Product();
    product.id = createStockDto.productId;

    const stock = this.stocksRepository.create({
      color: createStockDto.color,
      principal: createStockDto.principal,
      quantity: createStockDto.quantity,
      size: createStockDto.size,
    });

    const imagesEnts: Image[] = images.map((img) => {
      const image = new Image();
      image.bucketKey = img.originalname || '123';
      image.stock = stock;
      return image;
    });

    stock.images = imagesEnts;

    stock.product = product;

    const saved = await this.stocksRepository.save(stock);

    return { id: saved.id };
  }

  findAll() {
    return this.stocksRepository.find();
  }

  async findOne(id: string) {
    const stock = await this.stocksRepository.findOneBy({ id });

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
