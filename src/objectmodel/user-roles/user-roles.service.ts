import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleRepository } from './infrastructure/persistence/user-role.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { UserRole } from './domain/user-role';

@Injectable()
export class UserRolesService {
  constructor(
    // Dependencies here
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.userRoleRepository.create({
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
    return this.userRoleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserRole['id']) {
    return this.userRoleRepository.findById(id);
  }

  findByIds(ids: UserRole['id'][]) {
    return this.userRoleRepository.findByIds(ids);
  }

  async update(
    id: UserRole['id'],

    updateUserRoleDto: UpdateUserRoleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userRoleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateUserRoleDto.name,
    });
  }

  remove(id: UserRole['id']) {
    return this.userRoleRepository.remove(id);
  }
}
