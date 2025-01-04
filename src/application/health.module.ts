import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controller/health.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
