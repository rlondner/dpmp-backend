import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { RelationalUserRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalUserRolePersistenceModule,
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [UserRolesService, RelationalUserRolePersistenceModule],
})
export class UserRolesModule {}
