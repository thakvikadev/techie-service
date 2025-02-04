import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  schema: 'techie',
  name: 'phone_numbers',
})
export class PhoneNumber extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'phone_numerable_type' })
  numberableType: string;

  @Column({ name: 'phone_numerable_id' })
  numberableId: number;

  @Column({ name: 'label' })
  label: string;

  @Column({ name: 'country_code' })
  countryCode: number;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'verified_at' })
  verifiedAt: Date;
}
