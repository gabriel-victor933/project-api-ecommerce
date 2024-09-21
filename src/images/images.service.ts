import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto, file: Express.Multer.File) {
    const stock = new Stock();

    stock.id = createImageDto.stockId;

    const image = new Image();

    image.url = file.originalname;
    image.stock = stock;

    const saved = await this.imageRepository.save(image);
    return { id: saved.id };
  }

  remove(id: string) {
    return this.imageRepository.delete({ id: id });
  }
}
