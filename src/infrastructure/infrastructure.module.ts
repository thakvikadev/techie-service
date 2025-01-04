import { IOModule } from '@infrastructure/io/io.module';
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
    IOModule,
  ],
  exports: [IOModule, CachingModule],
})
export class InfrastructureModule {}
