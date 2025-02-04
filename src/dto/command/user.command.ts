export interface SignupCommand {
  name: string;
  email: string;
  password: string;
}

export interface LoginCommand {
  email: string;
  password: string;
}
export interface ForgotPasswordCommand {
  email: string;
}
export interface ChangePasswordCommand {
  oldPassword: string;
  newPassword: string;
}
export interface ResetPasswordCommand {
  resetToken: string;
  newPassword: string;
}
export interface RefreshTokenCommand {
  refreshToken: string;
}

export interface StoreUserCommand {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  gender: string;
  dob?: Date;
  idType: string;
  idNo: string;
  phone?: string;
  nationality?: string;
  maritalStatus?: string;
}
