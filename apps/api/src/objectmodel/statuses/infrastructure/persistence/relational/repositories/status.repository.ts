import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { StatusEntity } from '../entities/status.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Status } from '../../../../domain/status';
import { StatusRepositoryBase } from '../../status.repository';
import { StatusMapper } from '../mappers/status.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class StatusRelationalRepositoryBase implements StatusRepositoryBase {
  constructor(
    @InjectRepository(StatusEntity)
    private readonly statusRepositoryBase: Repository<StatusEntity>,
  ) {}

  async create(data: Status): Promise<Status> {
    const persistenceModel = StatusMapper.toPersistence(data);
    const newEntity = await this.statusRepositoryBase.save(
      this.statusRepositoryBase.create(persistenceModel),
    );
    return StatusMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Status[]> {
    const entities = await this.statusRepositoryBase.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => StatusMapper.toDomain(entity));
  }

  async findById(id: Status['id']): Promise<NullableType<Status>> {
    const entity = await this.statusRepositoryBase.findOne({
      where: { id },
    });

    return entity ? StatusMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Status['id'][]): Promise<Status[]> {
    const entities = await this.statusRepositoryBase.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => StatusMapper.toDomain(entity));
  }

  async update(id: Status['id'], payload: Partial<Status>): Promise<Status> {
    const entity = await this.statusRepositoryBase.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.statusRepositoryBase.save(
      this.statusRepositoryBase.create(
        StatusMapper.toPersistence({
          ...StatusMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return StatusMapper.toDomain(updatedEntity);
  }

  async remove(id: Status['id']): Promise<void> {
    await this.statusRepositoryBase.delete(id);
  }
}
