import { PermissionsServiceBase } from '../permissions/permissions.service';
import { Permission } from '../permissions/domain/permission';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleRepositoryBase } from './infrastructure/persistence/user-role.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { UserRole } from './domain/user-role';

@Injectable()
export class UserRolesServiceBase {
  constructor(
    protected readonly permissionServiceBase: PermissionsServiceBase,

    // Dependencies here
    protected readonly userRoleRepositoryBase: UserRoleRepositoryBase,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    // Do not remove comment below.
    // <creating-property />
    const permissionsObjects = await this.permissionServiceBase.findByIds(
      createUserRoleDto.permissions.map((entity) => entity.id),
    );
    if (permissionsObjects.length !== createUserRoleDto.permissions.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          permissions: 'notExists',
        },
      });
    }
    const permissions = permissionsObjects;

    return this.userRoleRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
      permissions,

      active: createUserRoleDto.active,

      name: createUserRoleDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userRoleRepositoryBase.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserRole['id']) {
    return this.userRoleRepositoryBase.findById(id);
  }

  findByIds(ids: UserRole['id'][]) {
    return this.userRoleRepositoryBase.findByIds(ids);
  }

  async update(
    id: UserRole['id'],

    updateUserRoleDto: UpdateUserRoleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let permissions: Permission[] | undefined = undefined;

    if (updateUserRoleDto.permissions) {
      const permissionsObjects = await this.permissionServiceBase.findByIds(
        updateUserRoleDto.permissions.map((entity) => entity.id),
      );
      if (permissionsObjects.length !== updateUserRoleDto.permissions.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            permissions: 'notExists',
          },
        });
      }
      permissions = permissionsObjects;
    }

    return this.userRoleRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      permissions,

      active: updateUserRoleDto.active,

      name: updateUserRoleDto.name,
    });
  }

  remove(id: UserRole['id']) {
    return this.userRoleRepositoryBase.remove(id);
  }
}
