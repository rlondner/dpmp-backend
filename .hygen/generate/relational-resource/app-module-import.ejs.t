---
inject: true
to: apps/api/src/app.module.ts
before: \@Module
---
import { <%= h.inflection.transform(name, ['pluralize']) %>ModuleBase } from './objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module';
