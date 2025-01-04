import { PositionView } from '@infrastructure/io/entity/position.entity';

export const POSITION_REPOSITORY = 'POSITION_REPOSITORY';

export interface IPositionRepository {
  /**
   * Get a position
   * @param id
   */
  findById(id: number): Promise<PositionView>;
  /**
   * Get a position
   * @param position code
   */
  findByCode(code: string): Promise<PositionView>;
}
