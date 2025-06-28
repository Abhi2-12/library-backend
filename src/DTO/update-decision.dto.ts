import { IsString } from 'class-validator';

export class UpdateDecisionDto {
  @IsString()
  decision: 'collection' | 'sale' | 'recycle';
}
