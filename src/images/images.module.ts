import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { BucketModule } from 'src/bucket/bucket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), BucketModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
