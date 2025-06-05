import { Address } from '../../../../domain/address';

import { AddressEntity } from '../entities/address.entity';

export class AddressMapper {
  static toDomain(raw: AddressEntity): Address {
    const domainEntity = new Address();
    domainEntity.country = raw.country;

    domainEntity.state = raw.state;

    domainEntity.city = raw.city;

    domainEntity.postalCode = raw.postalCode;

    domainEntity.line3 = raw.line3;

    domainEntity.line2 = raw.line2;

    domainEntity.line1 = raw.line1;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Address): AddressEntity {
    const persistenceEntity = new AddressEntity();
    persistenceEntity.country = domainEntity.country;

    persistenceEntity.state = domainEntity.state;

    persistenceEntity.city = domainEntity.city;

    persistenceEntity.postalCode = domainEntity.postalCode;

    persistenceEntity.line3 = domainEntity.line3;

    persistenceEntity.line2 = domainEntity.line2;

    persistenceEntity.line1 = domainEntity.line1;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
