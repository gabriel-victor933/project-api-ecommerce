import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

const COMMENTS_PER_PAGE = 10;

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);

    const product = new Product();
    product.id = createCommentDto.productId;

    comment.product = product;

    const saved = await this.commentRepository.save(comment);

    return { id: saved.id };
  }

  findAll(page: number) {
    return this.commentRepository.find({
      take: COMMENTS_PER_PAGE,
      skip: COMMENTS_PER_PAGE * page,
    });
  }

  findOne(id: string) {
    return this.commentRepository.findOneBy({ id: id });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: string) {
    return this.commentRepository.delete({ id: id });
  }
}
