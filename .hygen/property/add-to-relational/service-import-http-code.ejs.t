---
inject: true
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
before: from '@nestjs/common'
skip_if: HttpStatus,
---
<% if (kind === 'reference' || kind === 'duplication') { -%>
  HttpStatus,
  UnprocessableEntityException,
<% } -%>