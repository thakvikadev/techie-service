import { registerAs } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export default (config: string, ttl = parseInt(process.env.REDIS_TTL || '0')) =>
  registerAs(config, async () => ({
    store: await redisStore({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
      password: process.env.REDIS_PASSWORD || 'secret',
      ttl,
      pingInterval: 3000,
    }),
  }));
