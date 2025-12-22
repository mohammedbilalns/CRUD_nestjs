import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // global pipe to validate the incoming requests  
    new ValidationPipe({
      whitelist: true, // strips properties that doesnt have decorators 
      forbidNonWhitelisted: true,
      transform: true,  // automatically transforms payloads to be objects typed according to their dto classes 
      disableErrorMessages: false 
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
