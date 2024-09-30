import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Images } from './entities/images.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BucketService } from 'src/bucket/bucket.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private imageRepository: Repository<Images>,
    private bucketService: BucketService,
  ) {}

  async create(createImageDto: CreateImageDto, file: Express.Multer.File) {
    const fileKey = crypto.randomUUID();

    await this.bucketService.putObject(fileKey, file);

    const stock = new Stock();

    stock.id = createImageDto.stockId;

    const image = new Images();

    image.bucketKey = fileKey;
    image.stock = stock;

    const saved = await this.imageRepository.save(image);
    return { id: saved.id };
  }

  async remove(id: string) {
    const image = await this.imageRepository.findOne({ where: { id: id } });

    if (!image) throw new NotFoundException('Image Not Found!');

    await this.bucketService.deleteObject(image.bucketKey);

    return this.imageRepository.delete({ id: id });
  }
}
