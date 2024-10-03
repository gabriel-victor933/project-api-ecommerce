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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/product.entity';
import { DatabaseErrorsInterceptor } from 'src/errors/interceptor/errors.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(new DatabaseErrorsInterceptor('Type Don\'t exist!','Name is already in use!'))
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
      return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('type', new ParseUUIDPipe({optional: true})) type: string,
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
