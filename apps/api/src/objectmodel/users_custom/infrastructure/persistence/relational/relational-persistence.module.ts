import { Module } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserRepositoryBase } from '../../../../users/infrastructure/persistence/user.repository';
import { UserRelationalRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepositoryBase,
      useClass: UserRelationalRepository,
    },
  ],
  exports: [UserRepositoryBase],
})
export class RelationalUserPersistenceModule {}
