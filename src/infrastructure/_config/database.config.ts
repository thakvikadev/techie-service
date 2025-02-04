import { Role } from '@infrastructure/io/entity/role.entity';
import { User } from '@infrastructure/io/entity/user.entity';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { toBoolean } from '@utility/utils';

export default (_entities: string) =>
  registerAs(
    'database',
    (): TypeOrmModuleOptions => ({
      type: (process.env.DB_DRIVER as any) || 'pgsql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: process.env.DB_DATABASE || 'test',
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      entities: [_entities],
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
      // ssl: toBoolean(process.env.DB_SSL_REQUIRE)
      //   ? { rejectUnauthorized: false }
      //   : false,
    }),
  );

export const Entities = [Role, User];
