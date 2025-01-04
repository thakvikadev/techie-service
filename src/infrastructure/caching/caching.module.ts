import { CACHE_SERVICE } from '@domain/adapter/cache/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheConfigOptions } from './caching.option';
import { CacheConfig } from './config.model';
import { CacheService } from './service/cache.service';

@Module({})
export class CachingModule {
  static config(options: CacheConfigOptions<CacheConfig>): DynamicModule {
    return {
      imports: [
        CacheModule.registerAsync({
          imports: options.imports,
          useFactory: options.useFactory,
          inject: [ConfigService],
        }),
      ],
      providers: [
        {
          provide: CACHE_SERVICE,
          useClass: CacheService,
        },
      ],
      exports: [
        {
          provide: CACHE_SERVICE,
          useClass: CacheService,
        },
      ],
      module: CachingModule,
    };
  }
}
