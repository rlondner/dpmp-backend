---
inject: true
to: apps/api/src/app.module.ts
after: imports
---
    <%= h.inflection.transform(name, ['pluralize']) %>ModuleBase,