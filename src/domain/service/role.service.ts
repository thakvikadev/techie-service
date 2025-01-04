import { CreateRoleCommand } from '@dtos/command';

export const ROLE_SERVICE = 'ROLE_SERVICE';
export interface IRoleService {
  create(command: CreateRoleCommand): Promise<any>;
  list(): Promise<any>;
}
