sh deleteEntityFolders.sh ../objectmodel/organizations

# Restart the sequence for user_role_id_seq if it exists
# Uncomment the following line if you need to reset the sequence for user_role_id_seq
# Note: This command is specific to PostgreSQL. Adjust accordingly for other databases.
# psql -U your_username -d your_database -c "ALTER SEQUENCE user_role_id_seq RESTART WITH 1"
# ALTER SEQUENCE organization_id_seq RESTART WITH 1

# create the Organization table in the database
npm run generate:resource:relational -- --name Organization --idType increment
npm run add:property:to-relational -- --name Organization --property name --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Organization --property slug --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
npm run add:property:to-relational -- --name Organization --property description --kind primitive --type string --isAddToDto true --isOptional true --isNullable true
npm run add:property:to-relational -- --name Organization --property subscription --kind primitive --type string --isAddToDto true --isOptional false --isNullable false
