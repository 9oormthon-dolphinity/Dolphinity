import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BoardEntity } from 'src/boards/boards.entity';
import { CommonEntity } from 'src/common/common.entity';
import { ReviewEntity } from 'src/reviews/reviews.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'USER',
})
export class UserEntity extends CommonEntity {
  @ApiProperty({
    example: 'stark',
    description: '사용자 닉네임(unique)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.author, {
    cascade: true,
  })
  reviews: ReviewEntity[];

  @OneToMany(() => BoardEntity, (board: BoardEntity) => board.author, {
    cascade: true,
  })
  boards: BoardEntity[];
}
