import { Module } from '@nestjs/common';
import { AddressRepositoryBase } from '../address.repository';
import { AddressRelationalRepositoryBase } from './repositories/address.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [
    {
      provide: AddressRepositoryBase,
      useClass: AddressRelationalRepositoryBase,
    },
  ],
  exports: [AddressRepositoryBase],
})
export class RelationalAddressPersistenceModule {}
