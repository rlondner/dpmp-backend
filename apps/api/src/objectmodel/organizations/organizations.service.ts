import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationRepositoryBase } from './infrastructure/persistence/organization.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { Organization } from './domain/organization';

@Injectable()
export class OrganizationsServiceBase {
  constructor(
    // Dependencies here
    private readonly organizationRepositoryBase: OrganizationRepositoryBase,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.organizationRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
      subscription: createOrganizationDto.subscription,

      name: createOrganizationDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.organizationRepositoryBase.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Organization['id']) {
    return this.organizationRepositoryBase.findById(id);
  }

  findByIds(ids: Organization['id'][]) {
    return this.organizationRepositoryBase.findByIds(ids);
  }

  async update(
    id: Organization['id'],

    updateOrganizationDto: UpdateOrganizationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.organizationRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      subscription: updateOrganizationDto.subscription,

      name: updateOrganizationDto.name,
    });
  }

  remove(id: Organization['id']) {
    return this.organizationRepositoryBase.remove(id);
  }
}
