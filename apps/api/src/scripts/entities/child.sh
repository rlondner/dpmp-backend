npm run generate:resource:relational Child
npm run add:property:to-relational -- --name Child --property divorceCaseId --kind reference --type DivorceCase --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Child --property firstName --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Child --property lastName --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Child --property birthDate --kind primitive --type Date --isAddToDto true --isOptional false --isNullable false
