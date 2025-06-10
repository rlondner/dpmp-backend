import { OrganizationsServiceBase } from '../organizations/organizations.service';
import { Organization } from '../organizations/domain/organization';

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

    let role2: UserRole[] | null | undefined = undefined;

    if (createUserDto.role2) {
      const role2Objects = await this.userRoleServiceBase.findByIds(
        createUserDto.role2.map((entity) => entity.id),
      );
      if (role2Objects.length !== createUserDto.role2.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role2: 'notExists',
          },
        });
      }
      role2 = role2Objects;
    } else if (createUserDto.role2 === null) {
      role2 = null;
    }

    return this.userRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
      org,

      statusId: createUserDto.statusId,

      lastName: createUserDto.lastName,

      firstName: createUserDto.firstName,

      role2,

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

    let role2: UserRole[] | null | undefined = undefined;

    if (updateUserDto.role2) {
      const role2Objects = await this.userRoleServiceBase.findByIds(
        updateUserDto.role2.map((entity) => entity.id),
      );
      if (role2Objects.length !== updateUserDto.role2.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role2: 'notExists',
          },
        });
      }
      role2 = role2Objects;
    } else if (updateUserDto.role2 === null) {
      role2 = null;
    }

    return this.userRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      org,

      statusId: updateUserDto.statusId,

      lastName: updateUserDto.lastName,

      firstName: updateUserDto.firstName,

      role2,

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
