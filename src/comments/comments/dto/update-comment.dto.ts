import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(
  PickType(CreateCommentDto, ['comment'] as const),
) {}
