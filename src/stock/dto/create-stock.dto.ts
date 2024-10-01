import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Size } from '../../sizes/entities/size.entity';
import { Type } from 'class-transformer';

class SizeDto {
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsEnum(Size)
  size: Size;
}

export class CreateStockDto {
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
  @ArrayNotEmpty()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => SizeDto)
  sizes: SizeDto[];
  @IsBoolean()
  principal: boolean;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}
