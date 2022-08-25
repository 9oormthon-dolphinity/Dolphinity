import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardsRepository: Repository<BoardEntity>,
  ) {}

  async getSpots() {
    const boards = await this.boardsRepository.find();
    return boards;
  }

  async addBoard(boardEntity: BoardEntity): Promise<BoardEntity> {
    return await this.boardsRepository.save(boardEntity);
  }
}
