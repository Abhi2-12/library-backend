import { Controller, Post, Get, Patch, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from '../DTO/create-donation.dto';
import { UpdateDecisionDto } from '../DTO/update-decision.dto';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard

@UseGuards(AuthGuard('jwt'))
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async createDonation(@Body() createDonationDto: CreateDonationDto) {
    return this.donationService.createDonation(createDonationDto);
  }
  

  @Patch(':id/decision')
  async updateDecision(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDecisionDto: UpdateDecisionDto,
  ) {
    return this.donationService.updateDecision(id, updateDecisionDto);
  }

  @Patch(':id/tax-receipt')
  async issueTaxReceipt(@Param('id', ParseIntPipe) id: number) {
    return this.donationService.issueTaxReceipt(id);
  }

  @Get()
  async getAllDonations() {
    return this.donationService.getAllDonations();
  }
}
