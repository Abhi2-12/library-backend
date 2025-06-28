// WaiveFineDto.ts
import { IsOptional, IsString } from 'class-validator';

export class WaiveFineDto {
  @IsOptional()
  @IsString()
  reason: string;
}
