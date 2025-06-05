npm run generate:resource:relational DocumentType
npm run add:property:to-relational -- --name DocumentType --property code --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DocumentType --property label --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DocumentType --property required --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DocumentType --property requiredFor --kind primitive --type string[] --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DocumentType --property multiple --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true