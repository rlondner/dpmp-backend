import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationEntity } from '../../../../objectmodel/publications/infrastructure/persistence/relational/entities/publication.entity';
import { PublicationSeedService } from './publication-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity])],
  providers: [PublicationSeedService],
  exports: [PublicationSeedService],
})
export class PublicationSeedModule {}
