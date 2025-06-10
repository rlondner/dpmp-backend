import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepositoryBase } from './infrastructure/persistence/permission.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { Permission } from './domain/permission';

@Injectable()
export class PermissionsServiceBase {
  constructor(
    // Dependencies here
    protected readonly permissionRepositoryBase: PermissionRepositoryBase,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.permissionRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
      active: createPermissionDto.active,

      description: createPermissionDto.description,

      slug: createPermissionDto.slug,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.permissionRepositoryBase.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Permission['id']) {
    return this.permissionRepositoryBase.findById(id);
  }

  findByIds(ids: Permission['id'][]) {
    return this.permissionRepositoryBase.findByIds(ids);
  }

  async update(
    id: Permission['id'],

    updatePermissionDto: UpdatePermissionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.permissionRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      active: updatePermissionDto.active,

      description: updatePermissionDto.description,

      slug: updatePermissionDto.slug,
    });
  }

  remove(id: Permission['id']) {
    return this.permissionRepositoryBase.remove(id);
  }
}
