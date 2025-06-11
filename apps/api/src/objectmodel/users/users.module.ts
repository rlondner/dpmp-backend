import { OrganizationsModuleBase } from '../organizations/organizations.module';

import { PermissionsModuleBase } from '../permissions/permissions.module';
import { UserRolesModuleBase } from '../user-roles/user-roles.module';

import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { UsersServiceBase } from './users.service';
import { UsersControllerBase } from './users.controller';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    OrganizationsModuleBase,

    PermissionsModuleBase,

    UserRolesModuleBase,

    // do not remove this comment
    RelationalUserPersistenceModule,
  ],
  controllers: [UsersControllerBase],
  providers: [UsersServiceBase],
  exports: [UsersServiceBase, RelationalUserPersistenceModule],
})
export class UsersModuleBase {}
