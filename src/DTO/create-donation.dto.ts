import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  donorName: string;

  @IsEmail()
  donorEmail: string;

  @IsOptional()
  @IsString()
  donorPhone?: string;

  @IsString()
  itemDescription: string;
}
