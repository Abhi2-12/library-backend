import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';
import { BorrowingHistory } from '../BorrowingHistory.entity';
import { IsNull } from 'typeorm'; // Import IsNull operator

@Injectable()
export class BorrowingHistoryService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(BorrowingHistory)
    private readonly borrowingHistoryRepository: Repository<BorrowingHistory>,
  ) {}

  async borrowBook(bookId: number, userId: number) {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.status === 'borrowed') {
      throw new Error('Book is already borrowed');
    }

    // Update Book status
    book.status = 'borrowed';
    await this.bookRepository.save(book);

    // Create BorrowingHistory record
    const borrowingHistory = new BorrowingHistory();
    borrowingHistory.book = book;
    borrowingHistory.userId = userId;
    borrowingHistory.borrowedAt = new Date();
    await this.borrowingHistoryRepository.save(borrowingHistory);

    return { message: 'Book borrowed successfully' };
  }

  async returnBook(bookId: number, userId: number) {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.status !== 'borrowed') {
      throw new Error('Book is not currently borrowed');
    }

    // Update Book status
    book.status = 'available';
    await this.bookRepository.save(book);

    // Find the corresponding BorrowingHistory record where the book is not yet returned
    const history = await this.borrowingHistoryRepository.findOne({
      where: {
        book: { id: bookId },
        userId: userId,
        returnedAt: IsNull(), // Check for books not returned yet
      },
    });

    if (history) {
      // Set the return date
      history.returnedAt = new Date();
      await this.borrowingHistoryRepository.save(history);
    }

    return { message: 'Book returned successfully' };
  }

  async getBorrowedBooks() {
    // Get books that are currently borrowed
    const books = await this.bookRepository.find({
      where: { status: 'borrowed' },
    });

    return books;
  }

  async getBorrowingHistory() {
    // Get full borrowing history including related book information
    const histories = await this.borrowingHistoryRepository.find({
      relations: ['book'], // Join with the Book entity
    });

    return histories;
  }
}
