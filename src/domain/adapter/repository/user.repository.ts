import { User } from '@infrastructure/io/entity';
import { Repository } from 'typeorm';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export interface IUserRepository extends Repository<User> {
  findByEmail(email: any): Promise<User>;
  createUser(data: any): Promise<any>;
  findById(id: number): Promise<any>;
}
