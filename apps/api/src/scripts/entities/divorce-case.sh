# create the DivorceCase table in the database
npm run generate:resource:relational DivorceCase
npm run add:property:to-relational -- --name DivorceCase --property org --kind reference --type Organization --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DivorceCase --property clientId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DivorceCase --property spouseId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property clientAttorneyId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property spouseAttorneyId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property salesId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property paralegalId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property adverseAttorneyName --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property adverseAttorneyEmail --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property adverseAttorneyPhone --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DivorceCase --property status --kind primitive --type string --isAddToDto true --isOptional true --isNullable true