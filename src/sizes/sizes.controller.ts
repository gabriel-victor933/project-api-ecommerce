import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { affected } = await this.sizesService.remove(id);

    if (!affected) throw new NotFoundException('Size not found!');

    return 'Deleted';
  }
}
