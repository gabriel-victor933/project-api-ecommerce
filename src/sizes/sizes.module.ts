import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sizes } from './entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sizes])],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
