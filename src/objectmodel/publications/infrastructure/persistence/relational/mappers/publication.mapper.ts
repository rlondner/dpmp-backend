import { Publication } from '../../../../domain/publication';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { PublicationEntity } from '../entities/publication.entity';

export class PublicationMapper {
  static toDomain(raw: PublicationEntity): Publication {
    const domainEntity = new Publication();
    if (raw.creator) {
      domainEntity.creator = UserMapper.toDomain(raw.creator);
    } else if (raw.creator === null) {
      domainEntity.creator = null;
    }

    domainEntity.body = raw.body;

    domainEntity.title = raw.title;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Publication): PublicationEntity {
    const persistenceEntity = new PublicationEntity();
    if (domainEntity.creator) {
      persistenceEntity.creator = UserMapper.toPersistence(
        domainEntity.creator,
      );
    } else if (domainEntity.creator === null) {
      persistenceEntity.creator = null;
    }

    persistenceEntity.body = domainEntity.body;

    persistenceEntity.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
