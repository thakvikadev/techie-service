import { IRoleRepository, ROLE_REPOSITORY } from '@domain/adapter';
import { CreateRoleCommand } from '@dtos/command';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IRoleService } from '@services/role.service';
import { BaseService } from './base.service';

@Injectable()
export class RoleService extends BaseService implements IRoleService {
  constructor(
    protected readonly emitter: EventEmitter2,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {
    super(RoleService.name);
  }
  async create(command: CreateRoleCommand): Promise<any> {
    return await this.roleRepository.create(command);
  }
  async list(): Promise<any> {
    return await this.roleRepository.list();
  }
}
