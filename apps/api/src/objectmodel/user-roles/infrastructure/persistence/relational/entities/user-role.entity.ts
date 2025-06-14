import { PermissionEntity } from '../../../../../permissions/infrastructure/persistence/relational/entities/permission.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';

@Entity({
  name: 'user_role',
})
export class UserRoleEntity extends EntityRelationalHelper {
  @ManyToMany(() => PermissionEntity, { eager: true, nullable: false })
  @JoinTable()
  permissions: PermissionEntity[];

  @Column({
    nullable: false,
    type: Boolean,
  })
  active: boolean;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
