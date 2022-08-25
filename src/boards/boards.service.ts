import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { Repository, DataSource } from 'typeorm';

import { BoardEntity } from './boards.entity';
import { BoardAddDto } from './dto/boards.add.dto';
import { DetailBoardDto } from './dto/boards.detail.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardsRepository: Repository<BoardEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async getSpots() {
    try {
      return await this.boardsRepository.find();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async addBoard(boardEntity: BoardEntity): Promise<BoardEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const author = await queryRunner.manager
        .getRepository(UserEntity)
        .findOne({
          where: { id: 1 },
          relations: ['boards'],
        });
      const board = queryRunner.manager
        .getRepository(BoardEntity)
        .create(boardEntity);
      author.boards.push(board);
      await queryRunner.manager.getRepository(UserEntity).save(author);
      await queryRunner.commitTransaction();
      return board;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(e.message);
    } finally {
      await queryRunner.release();
    }
  }

  async detailBoard({ id }: DetailBoardDto) {
    try {
      const board = await this.boardsRepository.findOne({
        where: { id },
        relations: ['reviews'],
      });
      return board;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async like({ id }: DetailBoardDto) {
    try {
      const board = await this.boardsRepository.findOne({
        where: { id },
      });
      board.like += 1;
      return await this.boardsRepository.save(board);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteBoard({ id }: DetailBoardDto) {
    try {
      const board = await this.boardsRepository.findOne({
        where: { id },
      });
      return await this.boardsRepository.remove(board);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
