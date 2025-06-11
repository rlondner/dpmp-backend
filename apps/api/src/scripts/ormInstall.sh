#sh cleanOM.sh

# This script sets up the database schema for a divorce management system using npm commands.
# It creates various tables and their properties, including Organization, Address, Status, User, UserProfile, DivorceCase, Child, DocumentType, Document, Lead, and Payment.
#!/bin/bash

#sh entities/organization.sh
#sh entities/address.sh
#sh entities/status.sh
#sh entities/permission.sh
#sh entities/user-role.sh
sh entities/user.sh
#sh entities/user-role.sh
#sh entities/user-profile.sh
#sh entities/divorce-case.sh
#sh entities/child.sh
#sh entities/document-type.sh
#sh entities/document.sh
#sh entities/lead.sh
#sh entities/payment.sh








#npm run migration:generate -- apps/api/src/database/migrations/DPMP

npm run lint -- --fix

#npm run migration:run