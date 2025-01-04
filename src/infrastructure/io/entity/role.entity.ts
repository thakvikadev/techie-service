import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  schema: 'techie',
  name: 'roles',
})
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'module' })
  module: string;
}
