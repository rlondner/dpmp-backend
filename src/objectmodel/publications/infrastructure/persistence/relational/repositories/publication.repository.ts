import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PublicationEntity } from '../entities/publication.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Publication } from '../../../../domain/publication';
import { PublicationRepository } from '../../publication.repository';
import { PublicationMapper } from '../mappers/publication.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class PublicationRelationalRepository implements PublicationRepository {
  constructor(
    @InjectRepository(PublicationEntity)
    private readonly publicationRepository: Repository<PublicationEntity>,
  ) {}

  async create(data: Publication): Promise<Publication> {
    const persistenceModel = PublicationMapper.toPersistence(data);
    const newEntity = await this.publicationRepository.save(
      this.publicationRepository.create(persistenceModel),
    );
    return PublicationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Publication[]> {
    const entities = await this.publicationRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PublicationMapper.toDomain(entity));
  }

  async findById(id: Publication['id']): Promise<NullableType<Publication>> {
    const entity = await this.publicationRepository.findOne({
      where: { id },
    });

    return entity ? PublicationMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Publication['id'][]): Promise<Publication[]> {
    const entities = await this.publicationRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PublicationMapper.toDomain(entity));
  }

  async update(
    id: Publication['id'],
    payload: Partial<Publication>,
  ): Promise<Publication> {
    const entity = await this.publicationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.publicationRepository.save(
      this.publicationRepository.create(
        PublicationMapper.toPersistence({
          ...PublicationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PublicationMapper.toDomain(updatedEntity);
  }

  async remove(id: Publication['id']): Promise<void> {
    await this.publicationRepository.delete(id);
  }
}
