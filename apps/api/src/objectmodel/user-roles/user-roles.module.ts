import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { UserRolesServiceBase } from './user-roles.service';
import { UserRolesControllerBase } from './user-roles.controller';
import { RelationalUserRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalUserRolePersistenceModule,
  ],
  controllers: [UserRolesControllerBase],
  providers: [UserRolesServiceBase],
  exports: [UserRolesServiceBase, RelationalUserRolePersistenceModule],
})
export class UserRolesModuleBase {}
