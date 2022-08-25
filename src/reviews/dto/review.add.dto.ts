import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ReviewEntity } from '../reviews.entity';

export class AddReviewDto extends PickType(ReviewEntity, ['content']) {
  @ApiProperty({
    example: 2,
    description: 'board id',
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
