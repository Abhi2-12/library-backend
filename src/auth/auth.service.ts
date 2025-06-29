import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // adjust path if needed
import { RegisterDto } from '../DTO/register.dto';
import { EmailService } from '../email/email.service';

// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService, 
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

async handleForgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  const user = await this.userService.findByEmail(email);
  if (!user) {
    return { success: false, message: 'No user found with this email' };
  }

  const subject = 'Password Reset Request';
  const message = `Hi ${user.username},\n\nClick the link to reset your password (example): http://localhost:3001/reset-password?email=${encodeURIComponent(user.email)}\n\nIf you did not request this, ignore this email.`;

  await this.emailService.sendEmail(user.email, subject, message); // ✅ Send actual email

  return { success: true, message: 'Password reset email sent successfully' };
}

async resetPassword(email: string, newPassword: string) {
  const user = await this.userService.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  // Optionally: hash password before saving
  user.password = newPassword;
  await this.userService.updateUser(user.id, user);

  return { success: true, message: 'Password reset successfully' };
}



}
