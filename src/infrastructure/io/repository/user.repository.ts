import { IUserRepository } from '@domain/adapter/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
  createUser(data: any): Promise<any> {
    return data;
  }
  findById(id: number): Promise<any> {
    return this.findOne({ where: { id } });
  }
}
