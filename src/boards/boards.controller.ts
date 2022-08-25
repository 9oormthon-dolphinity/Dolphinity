import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/success.interceptor';
import { BoardEntity } from './boards.entity';
import { BoardsService } from './boards.service';

@Controller('api/boards')
@UseInterceptors(SuccessInterceptor)
@ApiTags('BOARD')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

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
    return await this.boardsService.addBoard(boardEntity);
  }
}
