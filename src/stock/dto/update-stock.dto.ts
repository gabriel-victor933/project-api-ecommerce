import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';

export class UpdateStockDto extends PartialType(
  OmitType(CreateStockDto, ['productId'] as const),
) {}
