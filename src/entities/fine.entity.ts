import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BorrowingHistory } from '../guests/BorrowingHistory.entity';
import { User } from './user.entity';

@Entity('fines')
export class Fine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BorrowingHistory, { nullable: false })
  @JoinColumn({ name: 'borrowing_history_id' })
  borrowingHistory: BorrowingHistory;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('decimal')
  amount: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'waived';

  @Column()
  reason: string;

  @Column({ name: 'issued_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  issuedAt: Date;
  
}
