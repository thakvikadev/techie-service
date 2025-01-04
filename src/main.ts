import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { factory } from '@utility/validation.utility';
import * as compression from 'compression';
import helmet from 'helmet';
import * as MethodOverride from 'method-override';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.connectMicroservice(config.get('transport'));

  app.use(helmet());
  const origins = ['https://connect.ababank.com'];
  if (process.env.NODE_ENV !== 'production') {
    origins.push(
      'http://localhost',
      'http://localhost:4200',
      'https://dev-hrms.ababank.com',
      'https://uat-hrms.ababank.com',
      'https://connect-uat.ababank.com',
      'https://dev-hrms.ababank.com:9004',
    );
  }

  app.enableVersioning({
    type: VersioningType.URI,
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
      whitelist: true,
      exceptionFactory: factory,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(parseInt(process.env.PORT, 10) || 8682);
}
bootstrap();
