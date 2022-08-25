import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
import { BoardEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { DetailBoardDto } from './dto/boards.detail.dto';

@Controller('api/boards')
@UseInterceptors(SuccessInterceptor)
@ApiTags('BOARD')
export class BoardsController {
  imgUrl: string;
  constructor(private readonly boardsService: BoardsService) {
    this.imgUrl = null;
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 200,
    type: [BoardEntity],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get()
  async getSpot(): Promise<BoardEntity[]> {
    return await this.boardsService.getSpots();
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('register')
  async addBoard(@Body() boardEntity: BoardEntity): Promise<BoardEntity> {
    const imageUrl = this.imgUrl;
    this.imgUrl = null;
    return await this.boardsService.addBoard({
      ...boardEntity,
      img: imageUrl,
    });
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(FileInterceptor('image', multerOptions('dolphins')))
  @Post('upload')
  async imageUpload(@UploadedFile() file) {
    this.imgUrl =
      process.env.NODE_ENV == 'dev'
        ? `http://localhost:5000/media/dolphins/${file.filename}`
        : `${process.env.APP_URL}/media/dolphins/${file.filename}`;
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('detail')
  async detailBoard(
    @Body() detailBoardDto: DetailBoardDto,
  ): Promise<BoardEntity> {
    return await this.boardsService.detailBoard(detailBoardDto);
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 201,
    description: '게시물 좋아요 수',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('like')
  async like(@Body() detailBoardDto: DetailBoardDto): Promise<BoardEntity> {
    return await this.boardsService.like(detailBoardDto);
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 200,
    description: '게시물 삭제',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('delete')
  async deleteBoard(@Body() detailBoardDto: DetailBoardDto) {
    return await this.boardsService.deleteBoard(detailBoardDto);
  }
}
