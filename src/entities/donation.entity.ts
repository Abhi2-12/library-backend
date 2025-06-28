import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'donor_name' })
  donorName: string;

  @Column({ name: 'donor_email' })
  donorEmail: string;

  @Column({ name: 'donor_phone', nullable: true })
  donorPhone: string;

  @Column({ name: 'item_description' })
  itemDescription: string;

  @Column({ name: 'condition_assessment', type: 'enum', enum: ['pending', 'good', 'damaged'], default: 'pending' })
  conditionAssessment: 'pending' | 'good' | 'damaged';

  @Column({ name: 'decision', type: 'enum', enum: ['undecided', 'collection', 'sale', 'recycle'], default: 'undecided' })
  decision: 'undecided' | 'collection' | 'sale' | 'recycle';

  @Column({ name: 'donated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  donatedAt: Date;

  @Column({ name: 'tax_receipt_issued', default: false })
  taxReceiptIssued: boolean;
}
