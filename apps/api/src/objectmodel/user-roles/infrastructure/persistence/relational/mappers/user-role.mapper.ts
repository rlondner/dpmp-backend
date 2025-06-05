import { UserRole } from '../../../../domain/user-role';

import { UserRoleEntity } from '../entities/user-role.entity';

export class UserRoleMapper {
  static toDomain(raw: UserRoleEntity): UserRole {
    const domainEntity = new UserRole();
    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: UserRole): UserRoleEntity {
    const persistenceEntity = new UserRoleEntity();
    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
