
npm run generate:resource:relational Payment
npm run add:property:to-relational -- --name Payment --property divorceCaseId --kind reference --type DivorceCase --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Payment --property stripePaymentId --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Payment --property amountCents --kind primitive --type number --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Payment --property currency --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Payment --property status --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run migration:generate -- src/database/migrations/Payment