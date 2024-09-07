import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsString()
  @IsUUID()
  productId: string;
}
