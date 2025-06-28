
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../book.entity';
import { BorrowingHistory } from '../BorrowingHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BorrowingHistory])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
