import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Permission } from '../../../../domain/permission';
import { PermissionRepositoryBase } from '../../permission.repository';
import { PermissionMapper } from '../mappers/permission.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class PermissionRelationalRepositoryBase
  implements PermissionRepositoryBase
{
  constructor(
    @InjectRepository(PermissionEntity)
    protected readonly permissionRepositoryBase: Repository<PermissionEntity>,
  ) {}

  async create(data: Permission): Promise<Permission> {
    const persistenceModel = PermissionMapper.toPersistence(data);
    const newEntity = await this.permissionRepositoryBase.save(
      this.permissionRepositoryBase.create(persistenceModel),
    );
    return PermissionMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Permission[]> {
    const entities = await this.permissionRepositoryBase.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PermissionMapper.toDomain(entity));
  }

  async findById(id: Permission['id']): Promise<NullableType<Permission>> {
    const entity = await this.permissionRepositoryBase.findOne({
      where: { id },
    });

    return entity ? PermissionMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Permission['id'][]): Promise<Permission[]> {
    const entities = await this.permissionRepositoryBase.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PermissionMapper.toDomain(entity));
  }

  async update(
    id: Permission['id'],
    payload: Partial<Permission>,
  ): Promise<Permission> {
    const entity = await this.permissionRepositoryBase.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.permissionRepositoryBase.save(
      this.permissionRepositoryBase.create(
        PermissionMapper.toPersistence({
          ...PermissionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PermissionMapper.toDomain(updatedEntity);
  }

  async remove(id: Permission['id']): Promise<void> {
    await this.permissionRepositoryBase.delete(id);
  }
}
