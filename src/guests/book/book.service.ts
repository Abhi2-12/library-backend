import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../book.entity';
import { Repository } from 'typeorm';
import { BorrowingHistory } from '../BorrowingHistory.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(BorrowingHistory)
    private readonly historyRepository: Repository<BorrowingHistory>,
  ) {}

  async findAvailableBooks() {
    return this.bookRepository.find({ where: { status: 'available' } });
  }

  async borrowBook(bookId: number, userId: number) {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');
    if (book.status === 'borrowed') throw new BadRequestException('Book is already borrowed');

    book.status = 'borrowed';
    await this.bookRepository.save(book);

    const history = this.historyRepository.create({ book, userId });
    await this.historyRepository.save(history);

    return { message: 'Book borrowed successfully' };
  }

  async returnBook(bookId: number, userId: number) {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');
    if (book.status === 'available') throw new BadRequestException('Book is already returned');

    book.status = 'available';
    await this.bookRepository.save(book);

    const history = await this.historyRepository.findOne({
        where: { book: { id: bookId }, userId, returnedAt: IsNull() }, // <-- Here is the change
        order: { borrowedAt: 'DESC' },
      });

    if (!history) throw new BadRequestException('No active borrow record found');

    history.returnedAt = new Date();
    await this.historyRepository.save(history);

    return { message: 'Book returned successfully' };
  }

  async findByIsbn(isbn: string) {
    const book = await this.bookRepository.findOne({ where: { isbn } });
    if (!book) throw new NotFoundException('Book with this ISBN not found');
    return book;
  }
}
