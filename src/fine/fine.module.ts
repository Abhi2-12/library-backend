import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fine } from '../entities/fine.entity';
import { BorrowingHistory } from '../guests/BorrowingHistory.entity';
import { User } from '../entities/user.entity';
import { FineService } from './fine.service';
import { FineController } from './fine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fine, BorrowingHistory, User])],
  controllers: [FineController],
  providers: [FineService],
})
export class FineModule {}
