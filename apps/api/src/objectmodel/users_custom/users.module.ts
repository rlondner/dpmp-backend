import { OrganizationsModuleBase } from '../organizations/organizations.module';

import { UserRolesModuleBase } from '../user-roles/user-roles.module';

import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrganizationsModuleBase,

    UserRolesModuleBase,

    // do not remove this comment
    RelationalUserPersistenceModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, RelationalUserPersistenceModule],
})
export class UsersModule {}
