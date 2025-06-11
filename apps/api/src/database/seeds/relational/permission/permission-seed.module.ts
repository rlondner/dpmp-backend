import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionSeedService } from './permission-seed.service';
import { PermissionEntity } from '../../../../objectmodel/permissions/infrastructure/persistence/relational/entities/permission.entity';
import { UserRoleEntity } from '../../../../objectmodel/user-roles/infrastructure/persistence/relational/entities/user-role.entity';
//import { UserRoleEntity } from '../../../../objectmodel/permissions/infrastructure/persistence/relational/entities/permission.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity, UserRoleEntity])],
  providers: [PermissionSeedService],
  exports: [PermissionSeedService],
})
export class PermissionSeedModule {}
