import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query('page', new ParseIntPipe({ optional: true })) page: number) {
    return this.productsService.findAll(page ?? 0);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { affected } = await this.productsService.update(
      id,
      updateProductDto,
    );

    if (!affected) throw new NotFoundException('Product not found!');

    return 'Updated!';
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const { affected } = await this.productsService.remove(id);

    if (!affected) throw new NotFoundException('Product not found!');

    return 'Deleted';
  }

  @Get(':id/comments')
  findProductComments(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ) {
    return this.productsService.findProductComments(id, page ?? 0);
  }
}
