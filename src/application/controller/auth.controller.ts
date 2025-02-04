import { NoAuth } from '@application/decorator/no-auth.decorator';
import { SwaggerRequest } from '@application/documentation/swagger';
import { AuthenticationGuard } from '@application/guard/authentication.guard';
import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
  SignupRequest,
} from '@requests/auth.request';
import { IUserService, USER_SERVICE } from '@services/user.service';

@Controller('auths')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @NoAuth()
  @ApiBody({ schema: SwaggerRequest.requestBody(SignupRequest) })
  @Post('signup')
  async signUp(@Body() signupData: SignupRequest) {
    return this.userService.signup(signupData);
  }

  @Post('login')
  @ApiBody({ schema: SwaggerRequest.requestBody(LoginRequest) })
  async login(@Body() credentials: LoginRequest) {
    return this.userService.login(credentials);
  }

  @Post('refresh')
  @ApiBody({ schema: SwaggerRequest.requestBody(RefreshTokenRequest) })
  async refreshTokens(@Body() refreshTokenRequest: RefreshTokenRequest) {
    console.log('refreshTokens', refreshTokenRequest);
    return this.userService.refreshTokens(refreshTokenRequest.refreshToken);
  }

  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  @ApiBody({ schema: SwaggerRequest.requestBody(ChangePasswordRequest) })
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
    @Req() req,
  ) {
    return this.userService.changePassword(
      req.userId,
      changePasswordRequest.oldPassword,
      changePasswordRequest.newPassword,
    );
  }

  @Post('forgot-password')
  @ApiBody({ schema: SwaggerRequest.requestBody(ForgotPasswordRequest) })
  async forgotPassword(@Body() forgotPasswordRequest: ForgotPasswordRequest) {
    return this.userService.forgotPassword(forgotPasswordRequest.email);
  }

  @Put('reset-password')
  @ApiBody({ schema: SwaggerRequest.requestBody(ResetPasswordRequest) })
  async resetPassword(@Body() resetPasswordRequest: ResetPasswordRequest) {
    return this.userService.resetPassword(
      resetPasswordRequest.newPassword,
      resetPasswordRequest.resetToken,
    );
  }
}
