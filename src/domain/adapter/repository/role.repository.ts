import { CreateRoleQuery } from '@dtos/query';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
export interface IRoleRepository {
  create(query: CreateRoleQuery): Promise<any>;
  list(): Promise<any>;
  getRoleById(id: number): Promise<any>;
}
