import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UnprocessableEntityException,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard)
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'webp',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          exceptionFactory: () => {
            throw new UnprocessableEntityException('Image file are required');
          },
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.imagesService.create(createImageDto, file);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const { affected } = await this.imagesService.remove(id);

    if (!affected) throw new NotFoundException('Image not found!');

    return 'Deleted';
  }
}
