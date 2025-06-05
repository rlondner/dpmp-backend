import { Module } from '@nestjs/common';
import { UserRepositoryBase } from '../user.repository';
import { UserRelationalRepositoryBase } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepositoryBase,
      useClass: UserRelationalRepositoryBase,
    },
  ],
  exports: [UserRepositoryBase],
})
export class RelationalUserPersistenceModule {}
