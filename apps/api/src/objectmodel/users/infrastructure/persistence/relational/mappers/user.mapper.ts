import { User } from '../../../../domain/user';
import { OrganizationMapper } from '../../../../../organizations/infrastructure/persistence/relational/mappers/organization.mapper';

import { PermissionMapper } from '../../../../../permissions/infrastructure/persistence/relational/mappers/permission.mapper';

import { UserRoleMapper } from '../../../../../user-roles/infrastructure/persistence/relational/mappers/user-role.mapper';

import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const domainEntity = new User();
    if (raw.org) {
      domainEntity.org = OrganizationMapper.toDomain(raw.org);
    } else if (raw.org === null) {
      domainEntity.org = null;
    }

    domainEntity.statusId = raw.statusId;

    domainEntity.lastName = raw.lastName;

    domainEntity.firstName = raw.firstName;

    domainEntity.isSuperUser = raw.isSuperUser;

    if (raw.permissions) {
      domainEntity.permissions = raw.permissions.map((item) =>
        PermissionMapper.toDomain(item),
      );
    } else if (raw.permissions === null) {
      domainEntity.permissions = null;
    }

    if (raw.roles) {
      domainEntity.roles = raw.roles.map((item) =>
        UserRoleMapper.toDomain(item),
      );
    } else if (raw.roles === null) {
      domainEntity.roles = null;
    }

    domainEntity.roleId = raw.roleId;

    domainEntity.password = raw.password;

    domainEntity.email = raw.email;

    domainEntity.provider = raw.provider;

    domainEntity.socialId = raw.socialId;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserEntity {
    const persistenceEntity = new UserEntity();
    if (domainEntity.org) {
      persistenceEntity.org = OrganizationMapper.toPersistence(
        domainEntity.org,
      );
    } else if (domainEntity.org === null) {
      persistenceEntity.org = null;
    }

    persistenceEntity.statusId = domainEntity.statusId;

    persistenceEntity.lastName = domainEntity.lastName;

    persistenceEntity.firstName = domainEntity.firstName;

    persistenceEntity.isSuperUser = domainEntity.isSuperUser;

    if (domainEntity.permissions) {
      persistenceEntity.permissions = domainEntity.permissions.map((item) =>
        PermissionMapper.toPersistence(item),
      );
    } else if (domainEntity.permissions === null) {
      persistenceEntity.permissions = null;
    }

    if (domainEntity.roles) {
      persistenceEntity.roles = domainEntity.roles.map((item) =>
        UserRoleMapper.toPersistence(item),
      );
    } else if (domainEntity.roles === null) {
      persistenceEntity.roles = null;
    }

    persistenceEntity.roleId = domainEntity.roleId;

    persistenceEntity.password = domainEntity.password;

    persistenceEntity.email = domainEntity.email;

    persistenceEntity.provider = domainEntity.provider;

    persistenceEntity.socialId = domainEntity.socialId;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
