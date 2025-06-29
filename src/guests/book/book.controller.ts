/*import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
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
*/

// src/guests/books/book.controller.ts
import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; // ← Only use this where needed

@Controller('guests/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // ✅ Public route for guests (no guards)
  @Get()
  findAvailableBooks() {
    return this.bookService.findAvailableBooks();
  }

  // ✅ Protected borrowing route - only for logged in users
  // @UseGuards(JwtAuthGuard) ← Uncomment if using JWT auth
  @Patch(':id/borrow')
  borrowBook(@Param('id') id: number, @Body('userId') userId: number) {
    return this.bookService.borrowBook(+id, +userId);
  }

  // ✅ Protected returning route - only for logged in users
  // @UseGuards(JwtAuthGuard)
  @Patch(':id/return')
  returnBook(@Param('id') id: number, @Body('userId') userId: number) {
    return this.bookService.returnBook(+id, +userId);
  }

  // ✅ Optional: search by ISBN (for any user)
  @Get('isbn/:isbn')
  findByIsbn(@Param('isbn') isbn: string) {
    return this.bookService.findByIsbn(isbn);
  }
}
