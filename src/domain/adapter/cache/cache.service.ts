export const CACHE_SERVICE = 'CACHE_SERVICE';

export interface ICacheService {
  find(request: string): Promise<any>;
  save(request: string, dto: any): Promise<void>;
  delete(request: string): Promise<void>;
}
