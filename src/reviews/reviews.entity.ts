import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BoardEntity } from 'src/boards/boards.entity';
import { CommonEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'REVIEW',
})
export class ReviewEntity extends CommonEntity {
  @ApiProperty({
    example: '돌고래 목격 햇어용',
    description: '댓글 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.reviews)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: UserEntity;

  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  board: BoardEntity;
}
