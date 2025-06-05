import { OrganizationsModule } from '../organizations/organizations.module';

import { UserRolesModule } from '../user-roles/user-roles.module';

import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { UsersServiceBase } from './users.service';
import { UsersControllerBase } from './users.controller';
import { RelationalUserPersistenceModuleBase } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrganizationsModule,

    UserRolesModule,

    // do not remove this comment
    RelationalUserPersistenceModuleBase,
  ],
  controllers: [UsersControllerBase],
  providers: [UsersServiceBase],
  exports: [UsersServiceBase, RelationalUserPersistenceModuleBase],
})
export class UsersModuleBase {}
