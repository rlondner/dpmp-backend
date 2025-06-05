---
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/relational-persistence.module.ts
---
import { Module } from '@nestjs/common';
import { <%= name %>RepositoryBase } from '../<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { <%= name %>RelationalRepositoryBase } from './repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= name %>Entity } from './entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity';

@Module({
  imports: [TypeOrmModule.forFeature([<%= name %>Entity])],
  providers: [
    {
      provide: <%= name %>RepositoryBase,
      useClass: <%= name %>RelationalRepositoryBase,
    },
  ],
  exports: [<%= name %>RepositoryBase],
})
export class Relational<%= name %>PersistenceModule {}
