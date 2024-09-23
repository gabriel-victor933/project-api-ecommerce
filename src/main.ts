import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
    }),
  );
  app.enableCors({ origin: '*' });
  const PORT = process.env.PORT;
  await app.listen(PORT, () => console.log(`running at port ${PORT}`));
}
bootstrap();
