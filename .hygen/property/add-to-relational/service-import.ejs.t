---
inject: true
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
at_line: 0
skip_if: import { <%= h.inflection.transform(type, ['pluralize']) %>ServiceBase
---
<% if (kind === 'reference' || kind === 'duplication') { -%>import { <%= h.inflection.transform(type, ['pluralize']) %>ServiceBase } from '../<%= h.inflection.transform(type, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(type, ['pluralize', 'underscore', 'dasherize']) %>.service';<% } -%>