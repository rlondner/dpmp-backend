---
inject: true
to: apps/api/src/database/seeds/relational/run-seed.ts
before: close
---
  await app.get(<%= name %>SeedService).run();
