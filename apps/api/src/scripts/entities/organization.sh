sh deleteEntityFolders.sh ../objectmodel/organizations
# create the Organization table in the database
npm run generate:resource:relational -- --name Organization --idType increment
npm run add:property:to-relational -- --name Organization --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Organization --property subscription --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
