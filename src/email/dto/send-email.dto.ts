import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsEmail, ValidateIf } from 'class-validator';

export class SendEmailDto {
  @ValidateIf(o => typeof o.to === 'string' || Array.isArray(o.to))
  @IsNotEmpty()
  to: string | string[];

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
