import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  const teste = process.env.DATABASE_TYPE;
  console.log(teste);
  await app.listen(PORT, () => console.log(`running at port ${PORT}`));
}
bootstrap();
