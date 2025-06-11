import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../../../objectmodel/organizations/infrastructure/persistence/relational/entities/organization.entity';
import { OrganizationSeedService } from './organization-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [OrganizationSeedService],
  exports: [OrganizationSeedService],
})
export class OrganizationSeedModule {}
