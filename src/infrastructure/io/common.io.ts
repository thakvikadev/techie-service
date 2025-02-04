import { ROLE_REPOSITORY } from '@domain/adapter';
import { USER_REPOSITORY } from '@domain/adapter/repository/user.repository';
import { Provider } from '@nestjs/common';
import { RoleRepository } from './repository';
import { UserRepository } from './repository/user.repository';
export const commonsIo: Provider[] = [
  {
    provide: ROLE_REPOSITORY,
    useClass: RoleRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];
