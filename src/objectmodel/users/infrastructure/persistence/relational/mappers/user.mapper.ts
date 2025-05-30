import { User } from '../../../../domain/user';
import { OrganizationMapper } from '../../../../../organizations/infrastructure/persistence/relational/mappers/organization.mapper';

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

    domainEntity.phone = raw.phone;

    domainEntity.lastName = raw.lastName;

    domainEntity.firstName = raw.firstName;

    if (raw.role2) {
      domainEntity.role2 = UserRoleMapper.toDomain(raw.role2);
    } else if (raw.role2 === null) {
      domainEntity.role2 = null;
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

    persistenceEntity.phone = domainEntity.phone;

    persistenceEntity.lastName = domainEntity.lastName;

    persistenceEntity.firstName = domainEntity.firstName;

    if (domainEntity.role2) {
      persistenceEntity.role2 = UserRoleMapper.toPersistence(
        domainEntity.role2,
      );
    } else if (domainEntity.role2 === null) {
      persistenceEntity.role2 = null;
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
