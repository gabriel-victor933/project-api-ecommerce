import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query('page', new ParseIntPipe({ optional: true })) page: number) {
    return this.commentsService.findAll(page ?? 0);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { affected } = await this.commentsService.update(
      id,
      updateCommentDto,
    );

    if (!affected) throw new NotFoundException('Product not found!');

    return 'Updated!';
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const { affected } = await this.commentsService.remove(id);

    if (!affected) throw new NotFoundException('Product not found!');

    return 'Deleted!';
  }
}
