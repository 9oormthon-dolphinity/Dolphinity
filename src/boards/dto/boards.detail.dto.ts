import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DetailBoardDto {
  @ApiProperty({
    example: 2,
    description: 'board id',
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
