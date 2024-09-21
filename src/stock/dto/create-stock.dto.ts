import {
  IsBooleanString,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { Size } from '../entities/stock.entity';
import { CustomMinValueNumericString } from 'src/utils/validation/customMinValueNumericString';

export class CreateStockDto {
  @IsNotEmpty()
  @IsNumberString()
  @Validate(CustomMinValueNumericString)
  quantity: number;
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
  @IsEnum(Size)
  size: Size;
  @IsBooleanString()
  principal: boolean;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}
