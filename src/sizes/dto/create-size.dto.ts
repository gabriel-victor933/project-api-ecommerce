import { IsEnum, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { Size } from '../entities/size.entity';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsUUID()
  stockId: string;
  @IsNumber()
  @Min(0)
  quantity: number;
  @IsEnum(Size)
  size: Size;
}
