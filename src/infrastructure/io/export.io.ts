import { TypeOrmModule } from '@nestjs/typeorm';
import { commonsIo } from './common.io';

export const exportsIo = [TypeOrmModule, ...commonsIo];
