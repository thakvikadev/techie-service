import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { CreateRoleRequest } from '@requests/role.request';
import { IRoleService, ROLE_SERVICE } from '@services/role.service';
import { BaseController } from './base.controller';

@Controller('roles')
export class RoleController extends BaseController {
  constructor(
    @Inject(ROLE_SERVICE)
    private readonly roleService: IRoleService,
  ) {
    super(RoleController.name);
  }
  @Get()
  list() {
    return this.roleService.list();
  }

  @Post()
  create(@Req() req: Request, @Body() body: CreateRoleRequest) {
    return this.roleService.create(body);
  }
}
