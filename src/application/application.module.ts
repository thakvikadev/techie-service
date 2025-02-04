import { DomainModule } from '@domain/domain.module';
import { activityConfig } from '@infrastructure/_config/activity.config';
import { ActivityModule } from '@infrastructure/activity/activity.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AuthController, RoleController, UserController } from './controller';
import { BadRequestExceptionFilter } from './exception/filter/bad-request.filter';
import { ErrorExceptionFilter } from './exception/filter/error.filter';
import { HttpExceptionFilter } from './exception/filter/http.filter';
// import { AuthenticationGuard } from './guard/authentication.guard';
// import { AuthorizationGuard } from './guard/authorization.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { RequestIdInterceptor } from './interceptor/request-id.interceptor';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: parseInt(config.get('RATE_LIMIT_TTL', '60')),
        limit: parseInt(config.get('RATE_LIMIT_TTL', '60')),
      }),
    }),
    // AuthModule.configAsync({
    //   imports: [ConfigModule.forFeature(authConfig)],
    //   useFactory: (config) => config.get('auth'),
    //   inject: [ConfigService],
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: process.env.FALLBACK_LOCALE || 'en',
      loaderOptions: {
        path: path.join(__dirname, '../i18n/'),
      },
      resolvers: [AcceptLanguageResolver],
    }),
    EventEmitterModule.forRoot(),
    ActivityModule.config(activityConfig),
    DomainModule,
  ],
  controllers: [AuthController, RoleController, UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorizationGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ScopeGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestIdInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
})
export class ApplicationModule {}
