npm run generate:resource:relational Document
npm run add:property:to-relational -- --name Document --property divorceCaseId --kind reference --type DivorceCase --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property userId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property childId --kind reference --type Child --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property documentTypeId --kind reference --type DocumentType --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Document --property fileUrl --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Document --property status --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property verified --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property signed --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property attorneyValidated --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property uploadedAt --kind primitive --type Date --isAddToDto true --isOptional true --isNullable true