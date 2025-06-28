import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('available')
  findAvailableBooks() {
    return this.bookService.findAvailableBooks();
  }

  @Patch(':id/borrow')
  borrowBook(@Param('id') id: number, @Body('userId') userId: number) {
    return this.bookService.borrowBook(+id, +userId);
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: number, @Body('userId') userId: number) {
    return this.bookService.returnBook(+id, +userId);
  }
 @Get('isbn/:isbn')
findByIsbn(@Param('isbn') isbn: string) {
  return this.bookService.findByIsbn(isbn);
}
}
