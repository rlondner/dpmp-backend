#create the UserRole table in the database

npm run generate:resource:relational -- --name UserRole --idType increment
npm run add:property:to-relational -- --name UserRole --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false