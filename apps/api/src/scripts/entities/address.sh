sh deleteEntityFolders.sh ../objectmodel/addresses
# create the Address table in the database
npm run generate:resource:relational -- --name Address --idType uuid
npm run add:property:to-relational -- --name Address --property line1 --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Address --property line2 --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Address --property line3 --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Address --property postalCode --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Address --property city --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Address --property state --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Address --property country --kind primitive --type string --isAddToDto true --isOptional false --isNullable false