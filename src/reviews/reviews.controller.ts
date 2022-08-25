import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/success.interceptor';
import { AddReviewDto } from './dto/review.add.dto';
import { ReviewsService } from './reviews.service';

@Controller('api/reviews')
@UseInterceptors(SuccessInterceptor)
@ApiTags('REVIEW')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 201,
    description: '게시물 댓글 API',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('add')
  async addReview(@Body() addReviewDto: AddReviewDto) {
    return this.reviewsService.addReview(addReviewDto);
  }
}
