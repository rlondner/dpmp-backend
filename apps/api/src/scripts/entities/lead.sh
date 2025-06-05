# create the Lead table in the database
npm run generate:resource:relational Lead
npm run add:property:to-relational -- --name Lead --property firstName --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Lead --property lastName --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Lead --property phone --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Lead --property postalCode --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Lead --property email --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Lead --property childCount --kind primitive --type number --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Lead --property realEstate --kind primitive --type boolean --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Lead --property telesalesId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Lead --property addressId --kind reference --type Address --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Lead --property spouseName --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Lead --property spousePhone --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Lead --property spouseAddressId --kind reference --type Address --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Lead --property orgId --kind reference --type Organization --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false