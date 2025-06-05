---
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity.ts
---
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';

@Entity({
  name: '<%= h.inflection.transform(name, ['underscore']) %>',
})
export class <%= name %>Entity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('<% if (idType === 'increment') { -%>increment<% } else { -%>uuid<% } -%>')
  id: 
  <% if (idType === 'increment') { -%>
  number
  <% } else { -%>
  string
<% } -%>
  ;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
