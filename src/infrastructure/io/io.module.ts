import databaseConfig, {
  Entities,
} from '@infrastructure/_config/database.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { exportsIo } from './export.io';
import { providersIo } from './provider.io';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig(__dirname + '/**/*.entity{.ts,.js}')],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(Entities),
  ],
  providers: providersIo,
  exports: exportsIo,
})
export class IOModule {}
