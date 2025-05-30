sh cleanOM.sh

#create the UserRole table in the database

npm run generate:resource:relational -- --name UserRole --idType increment
npm run add:property:to-relational -- --name UserRole --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false



# create the Organization table in the database
npm run generate:resource:relational -- --name Organization --idType increment
npm run add:property:to-relational -- --name Organization --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Organization --property subscription --kind primitive --type string --isAddToDto true --isOptional false --isNullable false


# create the Address table in the database
npm run generate:resource:relational -- --name Address --idType uuid
npm run add:property:to-relational -- --name Address --property line1 --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Address --property line2 --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Address --property line3 --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Address --property postalCode --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Address --property city --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Address --property state --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Address --property country --kind primitive --type string --isAddToDto true --isOptional false --isNullable false

# create the Status table in the database
npm run generate:resource:relational -- --name Status --idType increment
npm run add:property:to-relational -- --name Status --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false

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
npm run add:property:to-relational -- --name User --property profile --kind reference --type UserProfile --referenceType OneToOne --isAddToDto true --isOptional true --isNullable true


npm run generate:resource:relational -- --name UserProfile --idType uuid
npm run add:property:to-relational -- --name UserProfile --property user --kind reference --type Profile --referenceType OneToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name UserProfile --property spouse --kind reference --type User --referenceType OneToOne --isAddToDto true --isOptional true --isNullable true

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

npm run generate:resource:relational Child
npm run add:property:to-relational -- --name Child --property divorceCaseId --kind reference --type DivorceCase --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Child --property firstName --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Child --property lastName --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Child --property birthDate --kind primitive --type Date --isAddToDto true --isOptional false --isNullable false

npm run generate:resource:relational DocumentType
npm run add:property:to-relational -- --name DocumentType --property code --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DocumentType --property label --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DocumentType --property required --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name DocumentType --property requiredFor --kind primitive --type string[] --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name DocumentType --property multiple --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true


# create the Document table in the database
npm run generate:resource:relational Document
npm run add:property:to-relational -- --name Document --property divorceCaseId --kind reference --type DivorceCase --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property userId --kind reference --type User --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property childId --kind reference --type Child --referenceType manyToOne --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property documentTypeId --kind reference --type DocumentType --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Document --property fileUrl --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Document --property status --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property verified --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property signed --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property attorneyValidated --kind primitive --type boolean --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Document --property uploadedAt --kind primitive --type Date --isAddToDto true --isOptional true --isNullable true

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


npm run generate:resource:relational Payment
npm run add:property:to-relational -- --name Payment --property divorceCaseId --kind reference --type DivorceCase --referenceType manyToOne --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Payment --property stripePaymentId --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Payment --property amountCents --kind primitive --type number --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Payment --property currency --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Payment --property status --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run migration:generate -- src/database/migrations/Payment






#npm run migration:generate -- src/database/migrations/DPMP

npm run lint -- --fix

#npm run migration:run