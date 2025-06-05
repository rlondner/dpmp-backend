import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { AddressesServiceBase } from './addresses.service';
import { AddressesControllerBase } from './addresses.controller';
import { RelationalAddressPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalAddressPersistenceModule,
  ],
  controllers: [AddressesControllerBase],
  providers: [AddressesServiceBase],
  exports: [AddressesServiceBase, RelationalAddressPersistenceModule],
})
export class AddressesModuleBase {}
