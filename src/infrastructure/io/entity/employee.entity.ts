import { DatabaseSchema, WorkShiftEnum } from '@constants/enum';
import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  schema: DatabaseSchema.PUBLIC,
  name: 'v_employees',
})
export class EmployeeView {
  @ViewColumn()
  id?: number;

  @ViewColumn()
  uuid?: string;

  @ViewColumn()
  code?: number;

  @ViewColumn({ name: 'cif_number' })
  cifNumber?: number;

  @ViewColumn()
  title?: string;

  @ViewColumn()
  location?: string;

  @ViewColumn()
  functional?: string;

  @ViewColumn()
  doe?: string;

  @ViewColumn()
  dob?: string;

  @ViewColumn()
  profile?: string;

  @ViewColumn({ name: 'full_name' })
  fullName?: string;

  @ViewColumn()
  gender?: string;

  @ViewColumn()
  username?: string;

  @ViewColumn()
  email?: string;

  @ViewColumn()
  shift?: WorkShiftEnum;

  @ViewColumn()
  active?: boolean;

  @ViewColumn()
  status?: string;

  @ViewColumn({ name: 'country_code' })
  countryCode?: string;

  @ViewColumn({ name: 'phone_number' })
  phoneNumber?: string;

  @ViewColumn()
  date?: string;
}
