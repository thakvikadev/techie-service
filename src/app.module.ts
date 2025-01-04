import { ApplicationModule } from '@application/application.module';
import { HealthModule } from '@application/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApplicationModule, HealthModule],
})
export class AppModule {}
