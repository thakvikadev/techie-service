import { IRoleRepository } from '@domain/adapter/repository/role.repository';
import { CreateRoleQuery } from '@dtos/query';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { toSnakeCase } from '@utility/string.utility';
import { EntityManager } from 'typeorm';
import { Role } from '../entity';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {}

  async create(query: CreateRoleQuery): Promise<any> {
    const role = new Role();
    role.name = toSnakeCase(query.name);
    role.displayName = query.name;
    role.description = query.description;
    role.module = query?.module || 'user';

    await this.manager.save(role);

    return {
      id: role.id,
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      module: role.module,
    };
  }
  async list(): Promise<any> {
    const query = await this.manager
      .createQueryBuilder(Role, 'role')
      .orderBy('role.name', 'ASC')
      .getMany();
    return query.map((role) => ({
      id: role.id,
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      module: role.module,
    }));
  }
}
