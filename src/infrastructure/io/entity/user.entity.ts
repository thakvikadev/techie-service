import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  schema: 'techie',
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'phone', unique: true })
  phone: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'dob' })
  dob: Date;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'marital_status' })
  maritalStatus: string;

  @Column({ name: 'nationality' })
  nationality: string;

  @Column({ name: 'id_type' })
  idType: string;

  @Column({ name: 'id_number' })
  idNumber: string;

  // public get fullName() {
  //   return `${this.lastName} ${this.firstName}`;
  // }

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'is_verified' })
  isVerified: boolean;

  @Column({ name: 'verification_token' })
  verificationToken: string;

  @Column({ name: 'reset_token' })
  resetToken: string;

  @Column({ name: 'token' })
  token: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'reset_token_expiry' })
  resetTokenExpiry: Date;
}
