import { Controller, Get } from '@nestjs/common';
import { BookService } from '../book/book.service';



@Controller('guests/books')
export class GuestBookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAvailableBooks() {
    return this.bookService.findAvailableBooks(); // Only fetch books
  }
}
