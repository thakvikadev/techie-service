import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { EVENT_SERVICE } from './notify.model';
import { NotificationEvent } from './notification.event';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EVENT_SERVICE,
      useFactory: (config: ConfigService) =>
        ClientProxyFactory.create(config.get('transport')),
      inject: [ConfigService],
    },
    NotificationEvent,
  ],
  exports: [NotificationEvent],
})
export class NotificationModule {}
