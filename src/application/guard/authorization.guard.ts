import { NO_AUTH_KEY } from '@application/decorator/no-auth.decorator';
import { PERMISSIONS_KEY } from '@application/decorator/permission.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  // Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { IUserService, USER_SERVICE } from '@services/user.service';
// import { Permission } from 'src/roles/dtos/role.dto';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // @Inject(USER_SERVICE)
    // private readonly userService: IUserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const noAuth = this.reflector.getAllAndOverride(NO_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noAuth) {
      return true;
    }
    if (!request.userId) {
      throw new UnauthorizedException('User Id not found');
    }

    const routePermissions: string[] = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log(` the route permissions are ${routePermissions}`);

    if (!routePermissions) {
      return true;
    }

    try {
      // const userPermissions = await this.authService.getUserPermissions(
      //   request.userId,
      // );
      // for (const routePermission of routePermissions) {
      // const userPermission = userPermissions.find(
      //   (perm) => perm.resource === routePermission.resource,
      // );
      // if (!userPermission) throw new ForbiddenException();
      // const allActionsAvailable = routePermission.actions.every(
      //   (requiredAction) => userPermission.actions.includes(requiredAction),
      // );
      // if (!allActionsAvailable) throw new ForbiddenException();
      // }
    } catch (e) {
      throw new ForbiddenException();
    }
    return true;
  }
}
