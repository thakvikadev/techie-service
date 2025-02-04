import { SetMetadata } from '@nestjs/common';
// import { Permission } from 'src/roles/dtos/role.dto';

export const NO_AUTH_KEY = 'no-auth';

export const NoAuth = () => SetMetadata(NO_AUTH_KEY, true);
