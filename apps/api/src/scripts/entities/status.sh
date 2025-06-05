# create the Status table in the database
npm run generate:resource:relational -- --name Status --idType increment
npm run add:property:to-relational -- --name Status --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false