import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserRoleEntity } from '../entities/user-role.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { UserRole } from '../../../../domain/user-role';
import { UserRoleRepositoryBase } from '../../user-role.repository';
import { UserRoleMapper } from '../mappers/user-role.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class UserRoleRelationalRepositoryBase
  implements UserRoleRepositoryBase
{
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepositoryBase: Repository<UserRoleEntity>,
  ) {}

  async create(data: UserRole): Promise<UserRole> {
    const persistenceModel = UserRoleMapper.toPersistence(data);
    const newEntity = await this.userRoleRepositoryBase.save(
      this.userRoleRepositoryBase.create(persistenceModel),
    );
    return UserRoleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserRole[]> {
    const entities = await this.userRoleRepositoryBase.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => UserRoleMapper.toDomain(entity));
  }

  async findById(id: UserRole['id']): Promise<NullableType<UserRole>> {
    const entity = await this.userRoleRepositoryBase.findOne({
      where: { id },
    });

    return entity ? UserRoleMapper.toDomain(entity) : null;
  }

  async findByIds(ids: UserRole['id'][]): Promise<UserRole[]> {
    const entities = await this.userRoleRepositoryBase.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => UserRoleMapper.toDomain(entity));
  }

  async update(
    id: UserRole['id'],
    payload: Partial<UserRole>,
  ): Promise<UserRole> {
    const entity = await this.userRoleRepositoryBase.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.userRoleRepositoryBase.save(
      this.userRoleRepositoryBase.create(
        UserRoleMapper.toPersistence({
          ...UserRoleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserRoleMapper.toDomain(updatedEntity);
  }

  async remove(id: UserRole['id']): Promise<void> {
    await this.userRoleRepositoryBase.delete(id);
  }
}
