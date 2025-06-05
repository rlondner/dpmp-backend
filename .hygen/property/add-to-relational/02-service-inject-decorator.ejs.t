---
inject: true
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
before: protected readonly <%= h.inflection.camelize(type, true) %>ServiceBase
skip_if: \=\> <%= h.inflection.transform(type, ['pluralize']) %>ServiceBase\)\)
---
<% if (kind === 'reference' || kind === 'duplication') { -%>
  <% if (referenceType === 'oneToMany' || (referenceType === 'manyToOne' && !!propertyInReference)) { -%>
    @Inject(forwardRef(() => <%= h.inflection.transform(type, ['pluralize']) %>ServiceBase))
  <% } -%>
<% } -%>