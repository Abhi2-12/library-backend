import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowingHistory } from '../BorrowingHistory.entity'; // Adjust the import path
import { Book } from '../book.entity'; // Adjust the import path
import { BorrowingHistoryController } from './borrowing-history.controller';
import { BorrowingHistoryService } from './borrowing-history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BorrowingHistory]), // Add entities here
  ],
  controllers: [BorrowingHistoryController],
  providers: [BorrowingHistoryService],
})
export class BorrowingHistoryModule {}
