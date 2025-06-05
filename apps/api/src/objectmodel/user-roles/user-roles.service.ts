import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleRepositoryBase } from './infrastructure/persistence/user-role.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { UserRole } from './domain/user-role';

@Injectable()
export class UserRolesServiceBase {
  constructor(
    // Dependencies here
    private readonly userRoleRepositoryBase: UserRoleRepositoryBase,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.userRoleRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
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

    return this.userRoleRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateUserRoleDto.name,
    });
  }

  remove(id: UserRole['id']) {
    return this.userRoleRepositoryBase.remove(id);
  }
}
