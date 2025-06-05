sh deleteEntityFolders.sh ../objectmodel/users

# create the User table in the database
npm run generate:resource:relational -- --name User --idType increment
npm run add:property:to-relational -- --name User --property socialId --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property provider --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property email --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property password --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
#npm run add:property:to-relational -- --name User --property role --kind reference --type Role --referenceType manyToOne --isAddToDto false --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property roleId --kind primitive --type number --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name User --property role2 --kind reference --type UserRole --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property firstName --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property lastName --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property phone --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property statusId --kind primitive --type number --isAddToDto true --isOptional false --isNullable false
#npm run add:property:to-relational -- --name User --property status --kind reference --type Status --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name User --property org --kind reference --type Organization --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
#npm run add:property:to-relational -- --name User --property profile --kind reference --type UserProfile --referenceType OneToOne --isAddToDto true --isOptional true --isNullable true