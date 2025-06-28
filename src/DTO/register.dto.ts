import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;  // add this

  @IsString()
  @MinLength(3)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
