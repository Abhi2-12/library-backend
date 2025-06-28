// src/email/email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anamulhassan212@gmail.com',      // ✅ Your Gmail
      pass: 'jicv umgw racr vahk',             // ✅ Gmail App Password
    },
  });

  async sendEmail(to: string[] | string, subject: string, message: string): Promise<string> {
    let recipients: string[] = [];

    // Normalize
    if (typeof to === 'string') {
      to = [to];
    }

    // Check if backend should fetch emails by role
    if (to.length === 1) {
      if (to[0] === '__user__') {
        const users = await this.userRepository.find({ where: { role: UserRole.User } });
        recipients = users.map(u => u.email);
      } else if (to[0] === '__librarian__') {
        const librarians = await this.userRepository.find({ where: { role: UserRole.Librarian } });
        recipients = librarians.map(u => u.email);
      } else if (to[0] === '__all__') {
        const people = await this.userRepository.find({
          where: [
            { role: UserRole.User },
            { role: UserRole.Librarian },
          ],
        });
        recipients = people.map(u => u.email);
      } else {
        // It's a single email address
        recipients = to;
      }
    } else {
      recipients = to;
    }

    if (recipients.length === 0) {
      throw new Error('No valid recipients found.');
    }

    const mailOptions = {
      from: '"Library Admin" <anamulhassan212@gmail.com>',
      to: recipients.join(','),
      subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return 'Emails sent successfully';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send emails');
    }
  }
}
