---
inject: true
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
before: "} from 'class-validator'"
skip_if: \ValidateNested,
---
<% if (isAddToDto && (kind === 'reference' || kind === 'duplication')) { -%>
  ValidateNested,
<% } -%>