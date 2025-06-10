sh deleteEntityFolders.sh ../objectmodel/permissions
# create the Status table in the database
npm run generate:resource:relational -- --name Permission --idType increment
npm run add:property:to-relational -- --name Permission --property slug --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Permission --property description --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Permission --property active --kind primitive --type boolean --isAddToDto true --isOptional false --isNullable false