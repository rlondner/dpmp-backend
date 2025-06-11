import { UsersServiceBase } from '../users/users.service';
import { OrganizationsServiceBase } from '../organizations/organizations.service';
import { Organization } from '../organizations/domain/organization';
import { UserRole } from '../user-roles/domain/user-role';
import { UserRolesServiceBase } from '../user-roles/user-roles.service';
import { PermissionsService } from '../permissions_custom/permissions.service';
import { PermissionsServiceBase } from '../permissions/permissions.service';
import { Permission } from '../permissions/domain/permission';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { NullableType } from '../../utils/types/nullable.type';
import { User } from '../users/domain/user';

import {
  // common

  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';

export class UsersService extends UsersServiceBase {
  private readonly extendedUserRepository: UserRepository;

  constructor(
    organizationServiceBase: OrganizationsServiceBase,
    permissionServiceBase: PermissionsService,
    userRoleServiceBase: UserRolesServiceBase,
    userRepositoryBase: UserRepository,

  ) {
    //console.log('UsersService constructor called');
    super(
      organizationServiceBase,
      permissionServiceBase,
      userRoleServiceBase,
      userRepositoryBase,
    );
    this.extendedUserRepository = userRepositoryBase;
  }

  override async create(createUserDto: CreateUserDto): Promise<User> {
    // Do not remove comment below.
    // <creating-property />
    let org: Organization | null | undefined = undefined;

    if (createUserDto.org) {
      const orgObject = await this.organizationServiceBase.findById(
        createUserDto.org.id,
      );
      if (!orgObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            org: 'notExists',
          },
        });
      }
      org = orgObject;
    } else if (createUserDto.org === null) {
      org = null;
    }

    let email: string | null = null;

    if (createUserDto.email) {
      const userObject = await this.extendedUserRepository.findByEmail(
        createUserDto.email,
      );
      if (userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
      email = createUserDto.email;
    }

    let permissions: Permission[] | null | undefined = undefined;

    if (createUserDto.permissions) {
      const permissionsObjects = await this.permissionServiceBase.findByIds(
        createUserDto.permissions.map((entity) => entity.id),
      );
      if (permissionsObjects.length !== createUserDto.permissions.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            permissions: 'notExists',
          },
        });
      }
      permissions = permissionsObjects;
    } else if (createUserDto.permissions === null) {
      permissions = null;
    }

    let roles: UserRole[] | null | undefined = undefined;

    if (createUserDto.roles) {
      const rolesObjects = await this.userRoleServiceBase.findByIds(
        createUserDto.roles.map((entity) => entity.id),
      );
      if (rolesObjects.length !== createUserDto.roles.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            roles: 'notExists',
          },
        });
      }
      roles = rolesObjects;
    } else if (createUserDto.roles === null) {
      roles = null;
    }
    return this.userRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
      org,

      statusId: createUserDto.statusId,

      lastName: createUserDto.lastName,

      firstName: createUserDto.firstName,

      isSuperUser: createUserDto.isSuperUser,

      permissions,

      roles,

      roleId: createUserDto.roleId,

      password: createUserDto.password,

      email: createUserDto.email,

      provider: createUserDto.provider,

      socialId: createUserDto.socialId,
    });
  }

  findByEmail(email: User['email']): Promise<NullableType<User>> {
    return this.extendedUserRepository.findByEmail(email);
  }

  findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>> {
    return this.extendedUserRepository.findBySocialIdAndProvider({
      socialId,
      provider,
    });
  } // etc.
}
