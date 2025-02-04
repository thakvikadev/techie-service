import { SetMetadata } from '@nestjs/common';
// import { Permission } from 'src/roles/dtos/role.dto';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
