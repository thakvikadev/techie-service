import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupRequest {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  password: string;
}

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class ForgotPasswordRequest {
  @IsEmail()
  email: string;
}
export class ChangePasswordRequest {
  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  newPassword: string;
}
export class ResetPasswordRequest {
  @IsString()
  resetToken: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  newPassword: string;
}
export class RefreshTokenRequest {
  @IsString()
  refreshToken: string;
}
