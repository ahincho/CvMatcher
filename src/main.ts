import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const documentConfiguration = new DocumentBuilder()
    .setTitle('CvMatcher - Restful API')
    .setDescription('API Documentation for CvMatcher Job Offers Automation with Playwright')
    .setVersion('1.0.0')
    .addBearerAuth()
    .setContact(
      'Angel Hincho',
      'https://github.com/ahincho',
      'ahincho@unsa.edu.pe',
    )
    .setTermsOfService('https://github.com/ahincho/CvMatcher')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    documentConfiguration,
  );
  SwaggerModule.setup('/api/v1/docs', app, swaggerDocument);
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });
  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
