import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardEntity } from './boards.entity';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
