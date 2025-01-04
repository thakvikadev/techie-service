import { IEmployeeRepository } from '@adapters/repository/employee.repository';
import { EmployeeStatus } from '@constants/enum';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EmployeeView } from '../entity/employee.entity';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {}

  findById(id: number): Promise<EmployeeView> {
    return this.manager.findOne(EmployeeView, {
      where: { id, status: EmployeeStatus.APPROVED },
    });
  }

  findEmployee(uuid: string): Promise<EmployeeView> {
    return this.manager.findOne(EmployeeView, {
      where: { uuid, status: EmployeeStatus.APPROVED },
    });
  }
}
