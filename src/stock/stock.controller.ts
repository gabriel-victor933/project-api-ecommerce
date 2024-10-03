import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  @UseGuards(AuthGuard)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.stockService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    const { affected } = await this.stockService.update(id, updateStockDto);

    if (!affected) throw new NotFoundException('Product not found!');

    return 'Updated!';
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const { affected } = await this.stockService.remove(id);

    if (!affected) throw new NotFoundException('Stock not found!');

    return 'Deleted';
  }
}
