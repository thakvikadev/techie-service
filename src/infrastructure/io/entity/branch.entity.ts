import { DatabaseSchema } from '@constants/enum';
import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  schema: DatabaseSchema.PUBLIC,
  name: 'v_branch_addresses',
})
export class BranchView {
  @ViewColumn()
  id?: number;

  @ViewColumn()
  uuid?: string;

  @ViewColumn()
  code?: number;

  @ViewColumn()
  abbreviation?: string;

  @ViewColumn()
  name?: string;

  @ViewColumn()
  coordinate?: string;

  @ViewColumn()
  village: string;

  @ViewColumn()
  commune: string;

  @ViewColumn()
  district: string;

  @ViewColumn()
  province: string;

  @ViewColumn()
  country: string;
  @ViewColumn()
  regional: string;

  @ViewColumn()
  type: string;

  @ViewColumn()
  status: string;

  @ViewColumn()
  active: boolean;

  @ViewColumn()
  address: boolean;
}
