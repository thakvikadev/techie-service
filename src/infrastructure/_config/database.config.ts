import { BranchView } from '@infrastructure/io/entity/branch.entity';

import { EmployeeView } from '@infrastructure/io/entity/employee.entity';
import { PositionView } from '@infrastructure/io/entity/position.entity';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_DRIVER || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_DATABASE || 'test',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  useUTC: true,
  logging: true,
  entities: [
    PositionView,
    EmployeeView,
    BranchView,
  ],
}));
