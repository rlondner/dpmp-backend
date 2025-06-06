import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { StatusesServiceBase } from './statuses.service';
import { StatusesControllerBase } from './statuses.controller';
import { RelationalStatusPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalStatusPersistenceModule,
  ],
  controllers: [StatusesControllerBase],
  providers: [StatusesServiceBase],
  exports: [StatusesServiceBase, RelationalStatusPersistenceModule],
})
export class StatusesModuleBase {}
