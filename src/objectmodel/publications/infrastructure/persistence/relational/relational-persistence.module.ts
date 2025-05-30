import { Module } from '@nestjs/common';
import { PublicationRepository } from '../publication.repository';
import { PublicationRelationalRepository } from './repositories/publication.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationEntity } from './entities/publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity])],
  providers: [
    {
      provide: PublicationRepository,
      useClass: PublicationRelationalRepository,
    },
  ],
  exports: [PublicationRepository],
})
export class RelationalPublicationPersistenceModule {}
