import { registerAs } from '@nestjs/config';

export default (config: string) =>
  registerAs(config, () => ({
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || 'secret',
    },
    options: {
      attempts: 3,
      delay: 500,
      removeOnComplete: {
        age: 86400,
      },
      removeOnFail: 67,
    },
  }));
