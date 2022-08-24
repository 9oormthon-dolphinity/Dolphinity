import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

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
  @Column({ type: 'timestamp', unique: true, nullable: false })
  nickname: string;
}
