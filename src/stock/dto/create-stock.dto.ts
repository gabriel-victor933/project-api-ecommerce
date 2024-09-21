import {
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Size } from '../entities/stock.entity';

export class CreateStockDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
  @IsEnum(Size)
  size: Size;
  @IsBoolean()
  principal: boolean;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}
