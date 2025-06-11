sh deleteEntityFolders.sh ../objectmodel/user-roles
# Restart the sequence for user_role_id_seq if it exists
# Uncomment the following line if you need to reset the sequence for user_role_id_seq
# Note: This command is specific to PostgreSQL. Adjust accordingly for other databases.
# psql -U your_username -d your_database -c "ALTER SEQUENCE user_role_id_seq RESTART WITH 1"
# ALTER SEQUENCE user_role_id_seq RESTART WITH 1

#create the UserRole table in the database
npm run generate:resource:relational -- --name UserRole --idType increment
npm run add:property:to-relational -- --name UserRole --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name UserRole --property active --kind primitive --type boolean --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name UserRole --property permissions --kind reference --type Permission --referenceType manyToMany --isAddToDto true --isOptional false --isNullable false