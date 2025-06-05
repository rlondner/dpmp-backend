---
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
---
import { 
  // common
  Injectable,
} from '@nestjs/common';
import { Create<%= name %>Dto } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { Update<%= name %>Dto } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { <%= name %>RepositoryBase } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { <%= name %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';

@Injectable()
export class <%= h.inflection.transform(name, ['pluralize']) %>ServiceBase {
  constructor(
    // Dependencies here
    protected readonly <%= h.inflection.camelize(name, true) %>RepositoryBase: <%= name %>RepositoryBase,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create<%= name %>Dto: Create<%= name %>Dto
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.<%= h.inflection.camelize(name, true) %>RepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.<%= h.inflection.camelize(name, true) %>RepositoryBase.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: <%= name %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>RepositoryBase.findById(id);
  }

  findByIds(ids: <%= name %>['id'][]) {
    return this.<%= h.inflection.camelize(name, true) %>RepositoryBase.findByIds(ids);
  }

  async update(
    id: <%= name %>['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update<%= name %>Dto: Update<%= name %>Dto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.<%= h.inflection.camelize(name, true) %>RepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: <%= name %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>RepositoryBase.remove(id);
  }
}
