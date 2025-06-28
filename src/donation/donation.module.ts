import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from '../entities/donation.entity';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
