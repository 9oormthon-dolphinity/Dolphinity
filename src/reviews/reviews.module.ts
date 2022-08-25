import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './reviews.entity';
import { BoardEntity } from 'src/boards/boards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, BoardEntity])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
