import { OrganizationEntity } from '../../../../../organizations/infrastructure/persistence/relational/entities/organization.entity';

import { PermissionEntity } from '../../../../../permissions/infrastructure/persistence/relational/entities/permission.entity';

import { UserRoleEntity } from '../../../../../user-roles/infrastructure/persistence/relational/entities/user-role.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {
  @ManyToOne(() => OrganizationEntity, { eager: true, nullable: true })
  org?: OrganizationEntity | null;

  @Column({
    nullable: false,
    type: Number,
  })
  statusId: number;

  @Column({
    nullable: true,
    type: String,
  })
  lastName?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  firstName?: string | null;

  @Column({
    nullable: true,
    type: Boolean,
  })
  isSuperUser?: boolean | null;

  @ManyToMany(() => PermissionEntity, { eager: true, nullable: true })
  @JoinTable()
  permissions?: PermissionEntity[] | null;

  @ManyToMany(() => UserRoleEntity, { eager: true, nullable: true })
  @JoinTable()
  roles?: UserRoleEntity[] | null;

  @Column({
    nullable: false,
    type: Number,
  })
  roleId: number;

  @Column({
    nullable: true,
    type: String,
  })
  password?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  email?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  provider?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  socialId?: string | null;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
