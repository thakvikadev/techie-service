import {
  IRoleRepository,
  IUserRepository,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '@domain/adapter';
import { LoginCommand, SignupCommand, StoreUserCommand } from '@dtos/command';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '@services/user.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    // @Inject(RefreshToken.name)
    // private RefreshTokenModel: Model<RefreshToken>,
    // @Inject(ResetToken.name)
    // private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    // private mailService: MailService,
    @Inject(ROLE_REPOSITORY)
    private rolesRepository: IRoleRepository,
  ) {
    super(UserService.name);
  }
  async store(body: StoreUserCommand) {
    body['username'] = body.firstName + ' ' + body.lastName;
    // body['password'] = await bcrypt.hash(body['password'], 10);
    body['password'] = await bcrypt.hash('123456', 10);

    return this.userRepository.save(body);
  }

  async signup(signupData: SignupCommand) {
    const { email, password, name } = signupData;

    //Check if email is in use
    const emailInUse = await this.userRepository.findOne({
      where: { email },
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.save({
      username: name,
      email,
      password: hashedPassword,
    });
  }

  async login(credentials: LoginCommand) {
    const { email, password } = credentials;
    //Find if user exists by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Generate JWT tokens
    const tokens = await this.generateUserTokens(user.id);
    return {
      ...tokens,
      userId: user.id,
    };
  }

  async changePassword(userId, oldPassword: string, newPassword: string) {
    //Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found...');
    }

    //Compare the old password with the password in DB
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Change user's password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await this.userRepository.save(user);
  }

  async forgotPassword(email: string) {
    //Check that user exists
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      //If user exists, generate password reset link
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      // const resetToken = nanoid(64);
      // await this.ResetTokenModel.create({
      //   token: resetToken,
      //   userId: user._id,
      //   expiryDate,
      // });
      //Send the link to the user by email
      // this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return { message: 'If this user exists, they will receive an email' };
  }

  async resetPassword(newPassword: string) {
    //Find a valid reset token document
    // const token = await this.ResetTokenModel.findOneAndDelete({
    //   token: resetToken,
    //   expiryDate: { $gte: new Date() },
    // });

    // if (!token) {
    //   throw new UnauthorizedException('Invalid link');
    // }

    //Change user password (MAKE SURE TO HASH!!)
    const user = await this.userRepository.findOne({
      where: { id: 1 },
    });
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  }

  async refreshTokens() {
    // const token = await this.RefreshTokenModel.findOne({
    //   token: refreshToken,
    //   expiryDate: { $gte: new Date() },
    // });
    // if (!token) {
    //   throw new UnauthorizedException('Refresh Token is invalid');
    // }
    // return this.generateUserTokens(token.userId);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
    const refreshToken = uuidv4();

    // await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken() {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    // await this.RefreshTokenModel.updateOne(
    //   { userId },
    //   { $set: { expiryDate, token } },
    //   {
    //     upsert: true,
    //   },
    // );
  }

  async getUserPermissions(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new BadRequestException();

    const role = await this.rolesRepository.getRoleById(user.id);
    return role.permissions;
  }
}
