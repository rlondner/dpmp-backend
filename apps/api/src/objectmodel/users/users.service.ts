import { OrganizationsServiceBase } from '../organizations/organizations.service';
import { Organization } from '../organizations/domain/organization';

import { PermissionsServiceBase } from '../permissions/permissions.service';
import { Permission } from '../permissions/domain/permission';

import { UserRolesServiceBase } from '../user-roles/user-roles.service';
import { UserRole } from '../user-roles/domain/user-role';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryBase } from './infrastructure/persistence/user.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { User } from './domain/user';

@Injectable()
export class UsersServiceBase {
  constructor(
    protected readonly organizationServiceBase: OrganizationsServiceBase,

    protected readonly permissionServiceBase: PermissionsServiceBase,

    protected readonly userRoleServiceBase: UserRolesServiceBase,

    // Dependencies here
    protected readonly userRepositoryBase: UserRepositoryBase,
  ) {}

  async create(createUserDto: CreateUserDto) {
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

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userRepositoryBase.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: User['id']) {
    return this.userRepositoryBase.findById(id);
  }

  findByIds(ids: User['id'][]) {
    return this.userRepositoryBase.findByIds(ids);
  }

  async update(
    id: User['id'],

    updateUserDto: UpdateUserDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let org: Organization | null | undefined = undefined;

    if (updateUserDto.org) {
      const orgObject = await this.organizationServiceBase.findById(
        updateUserDto.org.id,
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
    } else if (updateUserDto.org === null) {
      org = null;
    }

    let permissions: Permission[] | null | undefined = undefined;

    if (updateUserDto.permissions) {
      const permissionsObjects = await this.permissionServiceBase.findByIds(
        updateUserDto.permissions.map((entity) => entity.id),
      );
      if (permissionsObjects.length !== updateUserDto.permissions.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            permissions: 'notExists',
          },
        });
      }
      permissions = permissionsObjects;
    } else if (updateUserDto.permissions === null) {
      permissions = null;
    }

    let roles: UserRole[] | null | undefined = undefined;

    if (updateUserDto.roles) {
      const rolesObjects = await this.userRoleServiceBase.findByIds(
        updateUserDto.roles.map((entity) => entity.id),
      );
      if (rolesObjects.length !== updateUserDto.roles.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            roles: 'notExists',
          },
        });
      }
      roles = rolesObjects;
    } else if (updateUserDto.roles === null) {
      roles = null;
    }

    return this.userRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      org,

      statusId: updateUserDto.statusId,

      lastName: updateUserDto.lastName,

      firstName: updateUserDto.firstName,

      isSuperUser: updateUserDto.isSuperUser,

      permissions,

      roles,

      roleId: updateUserDto.roleId,

      password: updateUserDto.password,

      email: updateUserDto.email,

      provider: updateUserDto.provider,

      socialId: updateUserDto.socialId,
    });
  }

  remove(id: User['id']) {
    return this.userRepositoryBase.remove(id);
  }
}
