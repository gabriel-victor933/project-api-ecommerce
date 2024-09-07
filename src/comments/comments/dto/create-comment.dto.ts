import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  person: string;
  @IsString()
  @IsNotEmpty()
  comment: string;
  @IsNumber()
  @Min(0)
  @Max(5)
  stars: number;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}
