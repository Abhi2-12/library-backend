import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  sendMail(@Body() body: SendEmailDto) {
    return this.emailService.sendEmail(body.to, body.subject, body.message);
  }
}
