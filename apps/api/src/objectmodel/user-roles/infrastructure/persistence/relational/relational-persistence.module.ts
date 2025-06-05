import { Module } from '@nestjs/common';
import { UserRoleRepositoryBase } from '../user-role.repository';
import { UserRoleRelationalRepositoryBase } from './repositories/user-role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [
    {
      provide: UserRoleRepositoryBase,
      useClass: UserRoleRelationalRepositoryBase,
    },
  ],
  exports: [UserRoleRepositoryBase],
})
export class RelationalUserRolePersistenceModule {}
