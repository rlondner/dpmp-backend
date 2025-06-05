import { Module } from '@nestjs/common';
import { OrganizationRepository } from '../organization.repository';
import { OrganizationRelationalRepository } from './repositories/organization.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './entities/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [
    {
      provide: OrganizationRepository,
      useClass: OrganizationRelationalRepository,
    },
  ],
  exports: [OrganizationRepository],
})
export class RelationalOrganizationPersistenceModule {}
