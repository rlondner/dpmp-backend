---
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts
---
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { <%= h.inflection.transform(name, ['pluralize']) %>ServiceBase } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service';
import { <%= h.inflection.transform(name, ['pluralize']) %>ControllerBase } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.controller';
import { Relational<%= name %>PersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    Relational<%= name %>PersistenceModule,
  ],
  controllers: [<%= h.inflection.transform(name, ['pluralize']) %>ControllerBase],
  providers: [<%= h.inflection.transform(name, ['pluralize']) %>ServiceBase],
  exports: [<%= h.inflection.transform(name, ['pluralize']) %>ServiceBase, Relational<%= name %>PersistenceModule],
})
export class <%= h.inflection.transform(name, ['pluralize']) %>ModuleBase {}
