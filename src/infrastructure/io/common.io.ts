import { ROLE_REPOSITORY } from '@domain/adapter';
import { Provider } from '@nestjs/common';
import { RoleRepository } from './repository';
export const commonsIo: Provider[] = [
  {
    provide: ROLE_REPOSITORY,
    useClass: RoleRepository,
  },
];
