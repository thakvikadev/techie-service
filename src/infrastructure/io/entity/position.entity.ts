import { DatabaseSchema, PositionStatus } from '@constants/enum';
import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  schema: DatabaseSchema.PUBLIC,
  name: 'v_positions',
})
export class PositionView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  code: string;

  @ViewColumn({ name: 'current_id' })
  currentId: number;

  @ViewColumn({ name: 'org_level_id' })
  orgLevelId: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  station: string;

  @ViewColumn()
  functional: string;

  @ViewColumn({ name: 'function_id' })
  functionId: number;

  @ViewColumn()
  division: string;

  @ViewColumn({ name: 'division_id' })
  divisionId: number;

  @ViewColumn()
  department: string;

  @ViewColumn({ name: 'department_id' })
  departmentId: number;

  @ViewColumn()
  unit: string;

  @ViewColumn({ name: 'unit_id' })
  unitId: number;

  @ViewColumn()
  status: PositionStatus;
}
