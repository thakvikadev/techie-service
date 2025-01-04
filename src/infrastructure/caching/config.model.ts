import { CacheStoreFactory } from '@nestjs/cache-manager';

export const CACHE_CONFIG = 'CACHE_CONFIG';

export class CacheConfig {
  ttl: number;
  store: string | CacheStoreFactory;
  host: string;
  port: number;
  password: string;
}
