import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { Repository, DataSource } from 'typeorm';

import { BoardEntity } from './boards.entity';
import { BoardAddDto } from './dto/boards.add.dto';

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

  async addBoard(boardAddDto: BoardAddDto): Promise<BoardEntity> {
    const { id, title, address, lat, lng, img, discovery } = boardAddDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const author = await queryRunner.manager
        .getRepository(UserEntity)
        .findOne({
          where: { id },
          relations: ['boards'],
        });
      const board = queryRunner.manager
        .getRepository(BoardEntity)
        .create({ title, address, lat, lng, img, discovery });
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
}
