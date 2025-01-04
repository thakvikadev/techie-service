export interface CreateRoleQuery {
  name: string;
  description: string;
  module?: string;
  permissions?: number[];
}
