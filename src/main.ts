import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();  // <--- Add this


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       
    forbidNonWhitelisted: true, // throws an error if extra fields are sent
    transform: true,        // auto-transform payloads into DTO instances
  }));

  await app.listen(3000);
}
bootstrap();
