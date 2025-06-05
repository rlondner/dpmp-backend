import { Module } from '@nestjs/common';
import { OrganizationRepositoryBase } from '../organization.repository';
import { OrganizationRelationalRepositoryBase } from './repositories/organization.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [
    {
      provide: OrganizationRepositoryBase,
      useClass: OrganizationRelationalRepositoryBase,
    },
  ],
  exports: [OrganizationRepositoryBase],
})
export class RelationalOrganizationPersistenceModule {}
