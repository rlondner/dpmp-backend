sh deleteEntityFolders.sh ../objectmodel/user-profiles
npm run generate:resource:relational -- --name UserProfile --idType uuid
npm run add:property:to-relational -- --name UserProfile --property user --kind reference --type User --referenceType OneToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name UserProfile --property spouse --kind reference --type User --referenceType OneToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name UserProfile --property phone --kind primitive --type string --isAddToDto true --isOptional true --isNullable true