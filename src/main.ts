import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  const isProdEnv = configService.get<string>('isProd');
  let allowedOriginList = [frontendUrl];
  if (isProdEnv != '1') {
    allowedOriginList.push('http://localhost:4200');
  }
  console.log('the allowedOrigins are:', allowedOriginList);
  app.enableCors({
    origin: allowedOriginList,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const currentPort = process.env.PORT ?? 3000;
  await app.listen(currentPort);
  console.log(`server started at PORT:${currentPort}`);
}
bootstrap();
