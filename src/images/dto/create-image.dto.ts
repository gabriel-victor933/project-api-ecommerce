import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @IsUUID()
  stockId: string;
}
