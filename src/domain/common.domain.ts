import { Provider } from '@nestjs/common';
import { RoleService, UserService } from '@services/impl';
// import { RoleService, UserService } from '@services/impl';
import { ROLE_SERVICE } from '@services/role.service';
import { USER_SERVICE } from '@services/user.service';
export const commonsDomain: Provider[] = [
  {
    provide: ROLE_SERVICE,
    useClass: RoleService,
  },
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];
