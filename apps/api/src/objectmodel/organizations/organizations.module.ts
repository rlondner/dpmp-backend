import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrganizationsServiceBase } from './organizations.service';
import { OrganizationsControllerBase } from './organizations.controller';
import { RelationalOrganizationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalOrganizationPersistenceModule,
  ],
  controllers: [OrganizationsControllerBase],
  providers: [OrganizationsServiceBase],
  exports: [OrganizationsServiceBase, RelationalOrganizationPersistenceModule],
})
export class OrganizationsModuleBase {}
