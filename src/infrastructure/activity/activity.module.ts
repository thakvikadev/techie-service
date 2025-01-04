import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ACTIVITY_HTTP, ActivityHttp } from './activity.http';
import { ACTIVITY_CONFIG, ActivityConfig } from './configs.model';

@Module({})
export class ActivityModule {
  static config(options: ActivityConfig): DynamicModule {
    return {
      imports: [ConfigModule],
      module: ActivityModule,
      providers: [
        {
          provide: 'ACTIVITY_SERVICE',
          useFactory: (config: ConfigService) =>
            ClientProxyFactory.create(config.get('transport')),
          inject: [ConfigService],
        },
        {
          provide: ACTIVITY_CONFIG,
          useValue: options,
        },
        {
          provide: ACTIVITY_HTTP,
          useClass: ActivityHttp,
        },
      ],
      exports: [
        {
          provide: ACTIVITY_HTTP,
          useClass: ActivityHttp,
        },
      ],
    };
  }
}
