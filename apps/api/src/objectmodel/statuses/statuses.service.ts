import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusRepositoryBase } from './infrastructure/persistence/status.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { Status } from './domain/status';

@Injectable()
export class StatusesServiceBase {
  constructor(
    // Dependencies here
    private readonly statusRepositoryBase: StatusRepositoryBase,
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.statusRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createStatusDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.statusRepositoryBase.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Status['id']) {
    return this.statusRepositoryBase.findById(id);
  }

  findByIds(ids: Status['id'][]) {
    return this.statusRepositoryBase.findByIds(ids);
  }

  async update(
    id: Status['id'],

    updateStatusDto: UpdateStatusDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.statusRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateStatusDto.name,
    });
  }

  remove(id: Status['id']) {
    return this.statusRepositoryBase.remove(id);
  }
}
