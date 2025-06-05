---
inject: true
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
after: constructor
skip_if: private readonly <%= h.inflection.camelize(type, true) %>ServiceBase
---
<% if (kind === 'reference' || kind === 'duplication') { -%>
  protected readonly <%= h.inflection.camelize(type, true) %>ServiceBase: <%= h.inflection.transform(type, ['pluralize']) %>ServiceBase,
<% } -%>