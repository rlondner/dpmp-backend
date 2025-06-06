---
inject: true
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity.ts
before: from \'typeorm\'
skip_if: \ManyToMany,
---
<% if (kind === 'reference' && referenceType === 'manyToMany') { -%>
  ManyToMany,
<% } -%>