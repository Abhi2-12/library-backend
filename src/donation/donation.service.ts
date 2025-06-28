import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from '../entities/donation.entity';
import { CreateDonationDto } from '../DTO/create-donation.dto';
import { UpdateDecisionDto } from '../DTO/update-decision.dto';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}

  async createDonation(createDonationDto: CreateDonationDto): Promise<Donation> {
    const donation = this.donationRepository.create(createDonationDto);
    return this.donationRepository.save(donation);
  }

  async updateDecision(id: number, updateDecisionDto: UpdateDecisionDto): Promise<Donation> {
    const donation = await this.findDonationById(id);
    donation.decision = updateDecisionDto.decision;
    return this.donationRepository.save(donation);
  }

  async issueTaxReceipt(id: number): Promise<Donation> {
    const donation = await this.findDonationById(id);
    donation.taxReceiptIssued = true;
    return this.donationRepository.save(donation);
  }

  async getAllDonations(): Promise<Donation[]> {
    return this.donationRepository.find();
  }

  private async findDonationById(id: number): Promise<Donation> {
    const donation = await this.donationRepository.findOne({ where: { id } });
    if (!donation) {
      throw new NotFoundException(`Donation with ID ${id} not found.`);
    }
    return donation;
  }
}
