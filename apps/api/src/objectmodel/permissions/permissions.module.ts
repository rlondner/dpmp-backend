import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { PermissionsServiceBase } from './permissions.service';
import { PermissionsControllerBase } from './permissions.controller';
import { RelationalPermissionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalPermissionPersistenceModule,
  ],
  controllers: [PermissionsControllerBase],
  providers: [PermissionsServiceBase],
  exports: [PermissionsServiceBase, RelationalPermissionPersistenceModule],
})
export class PermissionsModuleBase {}
