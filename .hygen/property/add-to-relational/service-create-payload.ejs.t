---
inject: true
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
after: \<creating\-property\-payload \/\>
---

<% if (kind === 'reference' || kind === 'duplication') { -%>
  <%= property %>,
<% } else { -%>
  <%= property %>: create<%= name %>Dto.<%= property %>,
<% } -%>
