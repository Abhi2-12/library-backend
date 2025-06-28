import { IsInt, IsPositive, IsNumber, IsString ,IsNotEmpty} from 'class-validator';

export class CreateFineDto {
    @IsInt()
    @IsPositive()
    userId: number;
  
    @IsInt()
  @IsPositive()
  borrowingHistoryId: number; 

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
