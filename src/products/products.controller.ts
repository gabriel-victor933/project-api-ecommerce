/* eslint-disable prettier/prettier */
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
  ParseEnumPipe,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category, Type } from './entities/product.entity';
import { DatabaseErrorsInterceptor } from 'src/errors/interceptor/errors.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(DatabaseErrorsInterceptor)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query(
      'type',
      new ParseEnumPipe(Type, {
        optional: true,
        exceptionFactory: () =>
          new BadRequestException(
            'type must be one of the following values: Casual, Formal, Party, Business',
          ),
      }),
    )
    type: Type,
    @Query(
      'category',
      new ParseEnumPipe(Category, {
        optional: true,
        exceptionFactory: () =>
          new BadRequestException(
            'category must be one of the following values: Menswear, Womenswear, Kidswear',
          ),
      }),
    )
    category: Category,
  ) {
    return this.productsService.findAll(page ?? 0, type, category);
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
