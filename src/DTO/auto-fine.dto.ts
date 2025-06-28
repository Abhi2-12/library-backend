import { IsInt, IsPositive } from 'class-validator';

export class AutoFineDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  borrowingId: number;
}
