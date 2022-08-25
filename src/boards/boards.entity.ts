import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'BOARD',
})
export class BoardEntity extends CommonEntity {
  @ApiProperty({
    example: '돌고래 봄',
    description: '게시물 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty({
    example: '제주시 고마로13길 31-1',
    description: '게시물 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  address: string;

  @ApiProperty({
    example: '41.4038',
    description: '돌고래 발견 스팟 위도',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'double', nullable: false })
  lat: number;

  @ApiProperty({
    example: '33.139',
    description: '돌고래 발견 스팟 경도',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'double', nullable: false })
  lng: number;

  @ApiProperty({
    example:
      'https://toiletprofile.s3.ap-northeast-2.amazonaws.com/Profile-Image.svg',
    description: '돌고래 사진',
  })
  @Column({ type: 'varchar', nullable: true })
  img: string;

  @ApiProperty({
    example:
      '유명한 애월 돌고래 전망대에서 오후 4시쯤에 귀여운 남방큰 돌고래를 목격했어요^^ 누군지는 모르겠지만 제돌이 같은 느낌이 들어요 :) 여러분도 보러가보세용 ㅎㅎㅎㅎ ><><',
    description: '돌고래 목격 상황 작성',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: true })
  situation: string;

  @ApiProperty({
    example: '15시 33분',
    description: '돌고래 목격 시간',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'timestamp',
    nullable: false,
    default: '1970-01-01 00:00:01',
  })
  discovery: Date;

  @ApiProperty({
    example: '3',
    description: '좋아요 숫자',
  })
  @IsNumber()
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  like: number;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.boards)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: UserEntity;
}
