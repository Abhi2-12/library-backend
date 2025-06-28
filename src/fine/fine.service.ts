import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fine } from '../entities/fine.entity';
import { CreateFineDto } from '../DTO/create-fine.dto';
import { PayFineDto } from '../DTO/pay-fine.dto';
import { WaiveFineDto } from '../DTO/waive-fine.dto';

import { BorrowingHistory } from '../guests/BorrowingHistory.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class FineService {
  constructor(
    @InjectRepository(Fine)
    private fineRepository: Repository<Fine>,

    @InjectRepository(BorrowingHistory)
    private historyRepo: Repository<BorrowingHistory>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createFine(dto: CreateFineDto): Promise<Fine> {
    const history = await this.historyRepo.findOneBy({ id: dto.borrowingHistoryId });
    if (!history) {
      throw new NotFoundException('Borrowing history not found');
    }
  
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const fine = this.fineRepository.create({
      amount: dto.amount,
      borrowingHistory: history,
      user: user,
      reason: dto.reason,
      isPaid: false,
      status: 'pending',
    });
  
    try {
      return await this.fineRepository.save(fine);
    } catch (err) {
      throw new Error('Failed to save fine. See logs.');
    }
  }
  
  
  
  async generateAutoFine(userId: number, borrowingId: number): Promise<Fine | string> {
    const borrowing = await this.historyRepo.findOne({
      where: { id: borrowingId },
      relations: ['book'],
    });
  
    if (!borrowing) throw new NotFoundException('Borrowing history not found');
  
    if (!borrowing.returnedAt) {
      return 'Book has not been returned yet.';
    }
  
    const borrowedDate = new Date(borrowing.borrowedAt);
    const returnedDate = new Date(borrowing.returnedAt);
    const diffInTime = returnedDate.getTime() - borrowedDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  
    const gracePeriod = 10;
    const lateDays = diffInDays - gracePeriod;
  
    if (lateDays <= 0) {
      return 'Book was returned on time. No fine applied.';
    }
  
    const fineAmount = lateDays * 5;
  
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');
  
    const fine = this.fineRepository.create({
      amount: fineAmount,
      borrowingHistory: borrowing,
      user,
      reason: `Returned ${lateDays} days late`,
      isPaid: false,
      status: 'pending',
    });
  
    return await this.fineRepository.save(fine);
  }
  
  async payFine(dto: PayFineDto): Promise<Fine> {
    const fine = await this.fineRepository.findOneBy({ id: dto.fineId });
    if (!fine) throw new NotFoundException('Fine not found');

    fine.isPaid = true;
    fine.status = 'paid';
    return await this.fineRepository.save(fine);
  }

  async waiveFine(fineId: number, reason?: string): Promise<Fine> {
    const fine = await this.fineRepository.findOneBy({ id: fineId });
    if (!fine) throw new NotFoundException('Fine not found');
  
    fine.status = 'waived';
    if (reason) fine.reason = reason;
  
    return await this.fineRepository.save(fine);
  }



  async getAccountSummary() {
  const totalReceived = await this.fineRepository
    .createQueryBuilder('fine')
    .select('SUM(fine.amount)', 'sum')
    .where('fine.isPaid = :paid', { paid: true })
    .getRawOne();

  const totalDue = await this.fineRepository
    .createQueryBuilder('fine')
    .select('SUM(fine.amount)', 'sum')
    .where('fine.isPaid = :paid', { paid: false })
    .getRawOne();

  return {
    totalReceived: Number(totalReceived.sum) || 0,
    totalDue: Number(totalDue.sum) || 0,
  };
}



  async getUserFines(userId: number): Promise<Fine[]> {
    return await this.fineRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'borrowingHistory'],
    });
  }

  
}
