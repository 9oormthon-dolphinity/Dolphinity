import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

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
}
