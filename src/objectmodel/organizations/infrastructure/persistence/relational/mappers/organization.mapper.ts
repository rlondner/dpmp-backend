import { Organization } from '../../../../domain/organization';

import { OrganizationEntity } from '../entities/organization.entity';

export class OrganizationMapper {
  static toDomain(raw: OrganizationEntity): Organization {
    const domainEntity = new Organization();
    domainEntity.subscription = raw.subscription;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Organization): OrganizationEntity {
    const persistenceEntity = new OrganizationEntity();
    persistenceEntity.subscription = domainEntity.subscription;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
