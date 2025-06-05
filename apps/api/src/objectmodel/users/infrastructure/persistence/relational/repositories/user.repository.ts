import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { User } from '../../../../domain/user';
import { UserRepositoryBase } from '../../user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class UserRelationalRepositoryBase implements UserRepositoryBase {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepositoryBase: Repository<UserEntity>,
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const newEntity = await this.userRepositoryBase.save(
      this.userRepositoryBase.create(persistenceModel),
    );
    return UserMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const entities = await this.userRepositoryBase.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    const entity = await this.userRepositoryBase.findOne({
      where: { id },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByIds(ids: User['id'][]): Promise<User[]> {
    const entities = await this.userRepositoryBase.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User> {
    const entity = await this.userRepositoryBase.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.userRepositoryBase.save(
      this.userRepositoryBase.create(
        UserMapper.toPersistence({
          ...UserMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserMapper.toDomain(updatedEntity);
  }

  async remove(id: User['id']): Promise<void> {
    await this.userRepositoryBase.delete(id);
  }
}
