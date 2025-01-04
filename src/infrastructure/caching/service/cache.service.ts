import { ICacheService } from '@domain/adapter/cache/cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class CacheService implements ICacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  find(request: string): Promise<any> {
    return this.cacheManager.get(request);
  }

  async save(request, result) {
    await this.cacheManager.set(request, result);
  }

  async delete(request) {
    await this.cacheManager.del(request);
  }
}
