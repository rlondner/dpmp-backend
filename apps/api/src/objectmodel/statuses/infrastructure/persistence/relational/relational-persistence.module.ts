import { Module } from '@nestjs/common';
import { StatusRepositoryBase } from '../status.repository';
import { StatusRelationalRepositoryBase } from './repositories/status.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusEntity } from './entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity])],
  providers: [
    {
      provide: StatusRepositoryBase,
      useClass: StatusRelationalRepositoryBase,
    },
  ],
  exports: [StatusRepositoryBase],
})
export class RelationalStatusPersistenceModule {}
