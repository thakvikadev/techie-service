import { Provider } from '@nestjs/common';
import { RoleService } from '@services/impl';
import { ROLE_SERVICE } from '@services/role.service';
export const commonsDomain: Provider[] = [
  {
    provide: ROLE_SERVICE,
    useClass: RoleService,
  },
];
