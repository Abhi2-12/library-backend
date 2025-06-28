import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './guests/book/book.module';
import { BorrowingHistoryModule } from './guests/borrowing-history/borrowing-history.module'; 
import { DonationModule } from './donation/donation.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FineModule } from './fine/fine.module';
import { EmailModule } from './email/email.module'; 

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'librarydb',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    BookModule,
    BorrowingHistoryModule,
    DonationModule,
    AuthModule,
    UserModule,
    FineModule,
    EmailModule,
  ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
