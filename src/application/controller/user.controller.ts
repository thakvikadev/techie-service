import { NoAuth } from '@application/decorator/no-auth.decorator';
import {
  SwaggerRequest,
  SwaggerResponse,
} from '@application/documentation/swagger';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from '@requests/user.request';
import { IUserService, USER_SERVICE } from '@services/user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @NoAuth()
  @Post()
  @ApiBody({ schema: SwaggerRequest.requestBody(CreateUserRequest) })
  @ApiResponse(SwaggerResponse.save[201])
  @ApiResponse(SwaggerResponse.save[401])
  @ApiResponse(SwaggerResponse.save[500])
  async store(@Body() body: CreateUserRequest) {
    return this.userService.store(body);
  }
}
