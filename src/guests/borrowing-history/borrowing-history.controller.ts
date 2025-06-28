import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BorrowingHistoryService } from './borrowing-history.service';

@Controller('borrowing-history')
export class BorrowingHistoryController {
  constructor(private readonly borrowingHistoryService: BorrowingHistoryService) {}

  @Post('borrow/:bookId')
  borrowBook(@Param('bookId') bookId: number, @Body('userId') userId: number) {
    return this.borrowingHistoryService.borrowBook(bookId, userId);
  }

  @Post('return/:bookId')
  returnBook(@Param('bookId') bookId: number, @Body('userId') userId: number) {
    return this.borrowingHistoryService.returnBook(bookId, userId);
  }

  @Get('borrowed-books')
  getBorrowedBooks() {
    return this.borrowingHistoryService.getBorrowedBooks();
  }

  @Get('history')
  getBorrowingHistory() {
    return this.borrowingHistoryService.getBorrowingHistory();
  }
}
