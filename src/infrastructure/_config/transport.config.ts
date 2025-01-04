import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default (config: string) =>
  registerAs(config, () => ({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
      retryAttempts: 3,
      retryDelay: 30000,
      pingInterval: 3000,
    },
  }));
