sh deleteEntityFolders.sh ../objectmodel/user-roles

#create the UserRole table in the database
npm run generate:resource:relational -- --name UserRole --idType increment
npm run add:property:to-relational -- --name UserRole --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name UserRole --property active --kind primitive --type boolean --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name UserRole --property permissions --kind reference --type Permission --referenceType manyToMany --isAddToDto true --isOptional false --isNullable false