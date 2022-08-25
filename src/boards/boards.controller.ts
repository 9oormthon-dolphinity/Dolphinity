import {
  Body,
  Controller,
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
import { BoardAddDto } from './dto/boards.add.dto';

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
  async imageUpload(@UploadedFile() file: Express.Multer.File) {
    this.imgUrl = `http://localhost:5000/media/dolphins/${file.filename}`;
  }
}
