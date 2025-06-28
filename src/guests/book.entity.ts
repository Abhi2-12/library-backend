import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BorrowingHistory } from './BorrowingHistory.entity';

@Entity('books') 
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'Default Title' }) // Default value
  title: string;

  @Column()
  author: string;

  @Column({ type: 'varchar', length: 20 })
  status: 'available' | 'borrowed';

  @Column({ type: 'varchar', length: 20, unique: true })
  isbn: string;

  @OneToMany(() => BorrowingHistory, history => history.book)
  histories: BorrowingHistory[];


}