import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Organization } from '../../../../domain/organization';
import { OrganizationRepositoryBase } from '../../organization.repository';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class OrganizationRelationalRepositoryBase
  implements OrganizationRepositoryBase
{
  constructor(
    @InjectRepository(OrganizationEntity)
    protected readonly organizationRepositoryBase: Repository<OrganizationEntity>,
  ) {}

  async create(data: Organization): Promise<Organization> {
    const persistenceModel = OrganizationMapper.toPersistence(data);
    const newEntity = await this.organizationRepositoryBase.save(
      this.organizationRepositoryBase.create(persistenceModel),
    );
    return OrganizationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Organization[]> {
    const entities = await this.organizationRepositoryBase.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrganizationMapper.toDomain(entity));
  }

  async findById(id: Organization['id']): Promise<NullableType<Organization>> {
    const entity = await this.organizationRepositoryBase.findOne({
      where: { id },
    });

    return entity ? OrganizationMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Organization['id'][]): Promise<Organization[]> {
    const entities = await this.organizationRepositoryBase.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrganizationMapper.toDomain(entity));
  }

  async update(
    id: Organization['id'],
    payload: Partial<Organization>,
  ): Promise<Organization> {
    const entity = await this.organizationRepositoryBase.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.organizationRepositoryBase.save(
      this.organizationRepositoryBase.create(
        OrganizationMapper.toPersistence({
          ...OrganizationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrganizationMapper.toDomain(updatedEntity);
  }

  async remove(id: Organization['id']): Promise<void> {
    await this.organizationRepositoryBase.delete(id);
  }
}
