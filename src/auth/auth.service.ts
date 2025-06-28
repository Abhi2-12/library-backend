import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // adjust path if needed
import { RegisterDto } from '../DTO/register.dto';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === password) {  // simple string compare
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password, role } = registerDto;

    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Save user with email included
    const user = await this.userService.createUser({
      username,
      email,
      password,
      role,
    });

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateJwtToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
