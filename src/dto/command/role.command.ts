export interface CreateRoleCommand {
  name: string;
  description: string;
  module?: string;
  permissions?: number[];
}
