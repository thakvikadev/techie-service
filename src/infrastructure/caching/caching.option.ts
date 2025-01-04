import { Abstract, DynamicModule, Type } from '@nestjs/common';

export class CacheConfigOptions<T> {
  imports: Array<Type | DynamicModule | Promise<DynamicModule>>;
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T;
  /**
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: Array<Type | string | Abstract<any>>;
}
