import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { BoardEntity } from '../boards.entity';

export class BoardAddDto extends PickType(BoardEntity, [
  'title',
  'address',
  'lat',
  'lng',
  'img',
  'situation',
  'discovery',
]) {
  @ApiProperty({
    example: 5,
    description: '사용자 id',
  })
  @IsNumber()
  @Type(() => Number)
  id: number;
}
