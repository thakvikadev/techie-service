import { EMPLOYEE_REPOSITORY } from '@domain/adapter/repository/employee.repository';
import { POSITION_REPOSITORY } from '@domain/adapter/repository/position.repository';
import databaseConfig from '@infrastructure/_config/database.config';
import { NotificationModule } from '@infrastructure/notification/notification.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesQuery } from './query/employee.query';
import { EmployeeRepository } from './repository/employee.repository';
import { PositionRepository } from './repository/position.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(),
    NotificationModule,
  ],
  providers: [
    EmployeesQuery,
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: EmployeeRepository,
    },
    {
      provide: POSITION_REPOSITORY,
      useClass: PositionRepository,
    },
  ],
  exports: [
    {
      provide: EMPLOYEE_REPOSITORY,
      useClass: EmployeeRepository,
    },
    {
      provide: POSITION_REPOSITORY,
      useClass: PositionRepository,
    },
  ],
})
export class DatabaseModule {}
