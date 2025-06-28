import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('borrowing_history') // table name exactly database er name
export class BorrowingHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, book => book.histories)
  @JoinColumn({ name: 'bookid' }) // database column name small letter diye
  book: Book;

  @Column({ name: 'userid' })
  userId: number;

  @Column({ name: 'borrowedat', type: 'timestamp' })
  borrowedAt: Date;

  @Column({ name: 'returnedat', type: 'timestamp', nullable: true })
  returnedAt: Date | null;
}

