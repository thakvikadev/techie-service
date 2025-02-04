import { LoginCommand, SignupCommand, StoreUserCommand } from '@dtos/command';

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
  store(createUserData: StoreUserCommand): Promise<any>;
  signup(signupData: SignupCommand): Promise<any>;
  login(credentials: LoginCommand): Promise<any>;
  refreshTokens(refreshToken: string): Promise<any>;
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<any>;
  forgotPassword(email: string): Promise<any>;
  resetPassword(newPassword: string, resetToken: string): Promise<any>;
}
