import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

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
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', nullable: false })
  img: string;

  @ApiProperty({
    example: '15시 33분',
    description: '돌고래 목격 시간',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  @Column({ type: 'timestamp', nullable: false })
  time: Date;
}
