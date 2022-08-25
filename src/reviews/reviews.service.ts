import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from 'src/boards/boards.entity';
import { DetailBoardDto } from 'src/boards/dto/boards.detail.dto';
import { UserEntity } from 'src/users/users.entity';
import { DataSource, Repository } from 'typeorm';
import { AddReviewDto } from './dto/review.add.dto';
import { ReviewEntity } from './reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepository: Repository<ReviewEntity>,
    @InjectRepository(BoardEntity)
    private readonly boardsRepository: Repository<BoardEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async addReview(addReviewDto: AddReviewDto) {
    const { id, content } = addReviewDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const author = await queryRunner.manager
        .getRepository(UserEntity)
        .findOne({ where: { id: 1 }, relations: ['boards', 'reviews'] });

      const board = await queryRunner.manager
        .getRepository(BoardEntity)
        .findOne({
          where: { id },
          relations: ['reviews'],
        });

      const review = queryRunner.manager
        .getRepository(ReviewEntity)
        .create({ content });
      author.boards.push(board);
      board.reviews.push(review);
      author.reviews.push(review);
      Promise.all([
        await queryRunner.manager.getRepository(BoardEntity).save(board),
        await queryRunner.manager.getRepository(UserEntity).save(author),
      ]);
      await queryRunner.commitTransaction();
      return review;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(e.message);
    } finally {
      await queryRunner.release();
    }
  }
}
