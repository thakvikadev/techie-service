import { DomainModule } from '@domain/domain.module';
import { activityConfig } from '@infrastructure/_config/activity.config';
import { ActivityModule } from '@infrastructure/activity/activity.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { RoleController } from './controller/role.controller';
import { BadRequestExceptionFilter } from './exception/filter/bad-request.filter';
import { ErrorExceptionFilter } from './exception/filter/error.filter';
import { HttpExceptionFilter } from './exception/filter/http.filter';
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
  controllers: [RoleController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
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
