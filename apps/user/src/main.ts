import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('USER_PORT'));

  console.log(`SERVER RUNING PORT : ${configService.get<number>('USER_PORT')}`);
}
bootstrap();
