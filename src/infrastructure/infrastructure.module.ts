import { DatabaseModule } from '@infrastructure/io/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cacheConfig from './_config/cache.config';
import transportConfig from './_config/transport.config';
import { CachingModule } from './caching/caching.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [transportConfig('transport')] }),
    CachingModule.config({
      imports: [ConfigModule.forFeature(cacheConfig('cache'))],
      useFactory: (config: ConfigService) => config.get('cache'),
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  exports: [DatabaseModule, CachingModule],
})
export class InfrastructureModule {}
