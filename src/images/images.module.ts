import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entities/images.entity';
import { BucketModule } from 'src/bucket/bucket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Images]), BucketModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
