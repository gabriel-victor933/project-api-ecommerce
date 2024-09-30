import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { DatabaseErrorsInterceptor } from 'src/errors/interceptor/errors.interceptor';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @UseInterceptors(
    new DatabaseErrorsInterceptor(
      "Type don't exist!",
      'Type is already in use',
    ),
  )
  @Post()
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  findAll() {
    return this.productTypeService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const { affected } = await this.productTypeService.remove(id);

    if (!affected) throw new NotFoundException('Product not found!');

    return 'Deleted';
  }
}
