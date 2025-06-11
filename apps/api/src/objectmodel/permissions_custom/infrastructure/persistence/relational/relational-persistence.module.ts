import { Module } from '@nestjs/common';
import { PermissionRepositoryBase } from '../permission.repository';
import { PermissionRelationalRepositoryBase } from './repositories/permission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  providers: [
    {
      provide: PermissionRepositoryBase,
      useClass: PermissionRelationalRepositoryBase,
    },
  ],
  exports: [PermissionRepositoryBase],
})
export class RelationalPermissionPersistenceModule {}
