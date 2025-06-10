import { UserRole } from '../../../../domain/user-role';
import { PermissionMapper } from '../../../../../permissions/infrastructure/persistence/relational/mappers/permission.mapper';

import { UserRoleEntity } from '../entities/user-role.entity';

export class UserRoleMapper {
  static toDomain(raw: UserRoleEntity): UserRole {
    const domainEntity = new UserRole();
    if (raw.permissions) {
      domainEntity.permissions = raw.permissions.map((item) =>
        PermissionMapper.toDomain(item),
      );
    }

    domainEntity.active = raw.active;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: UserRole): UserRoleEntity {
    const persistenceEntity = new UserRoleEntity();
    if (domainEntity.permissions) {
      persistenceEntity.permissions = domainEntity.permissions.map((item) =>
        PermissionMapper.toPersistence(item),
      );
    }

    persistenceEntity.active = domainEntity.active;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
