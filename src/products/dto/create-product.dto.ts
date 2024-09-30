import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Category } from '../entities/product.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  material: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  price: number;
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  typeId: string;
  @IsEnum(Category)
  category: Category;
  //valida array de strings.
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  features: string[];
}
