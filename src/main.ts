import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { factory } from '@utility/validation.utility';
import * as compression from 'compression';
import helmet from 'helmet';
import * as MethodOverride from 'method-override';
import 'reflect-metadata';
import { AppModule } from './app.module';
export const SWAGGER_API_ROOT = 'docs';
export const DEFAULT_TAG = 'Swagger Documentation';
export const URL = 'http://localhost:8002';

async function bootstrap() {
  const logger = new Logger('HTTP');
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.connectMicroservice(config.get('transport'));

  app.use(helmet());
  const origins = ['https://localhost:8002'];
  if (process.env.NODE_ENV !== 'production') {
    origins.push('http://localhost', 'http://localhost:8002');
  }

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.API_VERSION || '1',
  });
  app.enableCors({
    credentials: true,
    origin: origins,
    methods: ['GET', 'POST', 'HEAD'],
    preflightContinue: false,
  });
  app.use(MethodOverride('X-HTTP-Method-Override'));
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out extra fields not defined in the DTO
      forbidNonWhitelisted: true, // Reject requests with extra fields
      transform: true, // Automatically transform payloads to match DTO types
      exceptionFactory: factory,
    }),
  );
  const configDoc = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag(DEFAULT_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  const openApiURL = `${URL}/${SWAGGER_API_ROOT}`;

  const port = parseInt(process.env.PORT, 10) || 8002;

  logger.log(`🟢 Service is listening at ${port} 🟢\n`);
  logger.log(`🔵 swagger listening at ${openApiURL}`);

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
