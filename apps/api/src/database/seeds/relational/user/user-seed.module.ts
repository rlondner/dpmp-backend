import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeedService } from './user-seed.service';
import { UserEntity } from '../../../../objectmodel/users/infrastructure/persistence/relational/entities/user.entity';
import { UserRole } from '../../../../objectmodel/user-roles/domain/user-role';
import { UserRoleEntity } from '../../../../objectmodel/user-roles/infrastructure/persistence/relational/entities/user-role.entity';
import { OrganizationEntity } from '../../../../objectmodel/organizations/infrastructure/persistence/relational/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRoleEntity, OrganizationEntity]),
  ],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
