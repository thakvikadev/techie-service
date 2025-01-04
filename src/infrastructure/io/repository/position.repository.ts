import { PositionStatus } from '@constants/enum';
import { IPositionRepository } from '@domain/adapter/repository/position.repository';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PositionView } from '../entity/position.entity';

@Injectable()
export class PositionRepository implements IPositionRepository {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {}

  findById(id: number): Promise<PositionView> {
    return this.manager.findOne(PositionView, {
      where: [{ id }, { currentId: id }],
    });
  }

  findByCode(code: string): Promise<PositionView> {
    return this.manager.findOne(PositionView, {
      where: { code, status: PositionStatus.ACTIVE },
    });
  }
}
