import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { RoleEnum } from '../../../../objectmodel/roles/roles.enum';
import { StatusEnum } from '../../../../objectmodel/statuses_original/statuses.enum';
import { UserEntity } from '../../../../objectmodel/users/infrastructure/persistence/relational/entities/user.entity';
import { UserRole } from '../../../../objectmodel/user-roles/domain/user-role';
import { UserRoleEntity } from '../../../../objectmodel/user-roles/infrastructure/persistence/relational/entities/user-role.entity';
import { UserRoleMapper } from '../../../../objectmodel/user-roles/infrastructure/persistence/relational/mappers/user-role.mapper';
import { OrganizationEntity } from '../../../../objectmodel/organizations/infrastructure/persistence/relational/entities/organization.entity';
import { count } from 'console';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
    @InjectRepository(OrganizationEntity)
    private orgRepository: Repository<OrganizationEntity>,
  ) {}

  async run() {
    // await this.roleRepository.find({
    //   where: {name: 'Admin'},
    //   // relations: ['permissions'],
    // }).then((roles) => {
    // }

    const countAdminRole = await this.userRoleRepository.count({
      where: {
        name: 'Admin',
        // id: RoleEnum.admin,
        // permissions: {
        //   slug: In([
        //     'admin.access.users.read',
        //     'admin.access.users.create',
        //     'admin.access.users.update',
        //     'admin.access.roles.read',
        //     'admin.access.roles.create',
        //     'admin.access.roles.update',
        //   ]),
        // },
      },
    });
    console.log('countAdminRole', countAdminRole);

    const countOrgs = await this.orgRepository.count();

    if (countOrgs > 2) {
      const defaultOrg = await this.orgRepository.findOne({
        where: { slug: 'default-organization' },
      });

      const blanchardOrg = await this.orgRepository.findOne({
        where: { slug: 'blanchard-cabinet' },
      });

      const gideOrg = await this.orgRepository.findOne({
        where: { slug: 'gide-avocats' },
      });

      const countAdmin = await this.repository.count({
        where: {
          roles: {
            name: 'Admin',
          },
          // id: RoleEnum.admin,
          //roleId: RoleEnum.admin,
          // role: {
          //   id: RoleEnum.admin,
          // },
        },
      });
      console.log('countAdmin', countAdmin);

      const adminRoleEntity = await this.userRoleRepository.findOne({
        where: { name: 'Admin' },
        // relations: ['permissions'],
      });

      const attorneyRoleEntity = await this.userRoleRepository.findOne({
        where: { name: 'Attorney' },
        // relations: ['permissions'],
      });

      const customerServiceRoleEntity = await this.userRoleRepository.findOne({
        where: { name: 'CustomerService' },
        // relations: ['permissions'],
      });

      if (!countAdmin && countAdminRole > 0) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash('secret', salt);

        //const adminRole = adminRoleEntity ? UserRoleMapper.toDomain(adminRoleEntity) : null;

        await this.repository.save(
          this.repository.create({
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@example.com',
            password,
            // roles: [
            //   adminRole ? adminRole : null,
            // ],
            isSuperUser: true,
            //roles: adminRoleEntity ? [adminRoleEntity] : [],
            // roles: [
            //   adminRole ? adminRole : null,
            // ],
            roleId: RoleEnum.admin,
            statusId: StatusEnum.active,
            org: defaultOrg,
          }),
        );
        // role: {)

        await this.repository.save(
          this.repository.create({
            firstName: 'Blanchard',
            lastName: 'Admin',
            email: 'admin@example.com',
            password,
            isSuperUser: false,
            roles: adminRoleEntity ? [adminRoleEntity] : [],
            // roles: [
            //   adminRole ? adminRole : null,
            // ],
            roleId: RoleEnum.admin,
            // role: {
            //   id: RoleEnum.admin,
            //   name: 'Admin',
            // },
            // status: {
            //   id: StatusEnum.active,
            //   name: 'Active',
            // },
            statusId: StatusEnum.active,
            org: blanchardOrg,
          }),
        );
      }

      const countAttorney = await this.repository.count({
        where: {
          roles: {
            name: 'Attorney',
          },
        },
      });

      // const countUser = await this.repository.count({
      //   where: {
      //     roleId: RoleEnum.user,
      //     // role: {
      //     //   id: RoleEnum.user,
      //     // },
      //   },
      // });

      if (!countAttorney) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash('secret', salt);

        await this.repository.save(
          this.repository.create({
            firstName: 'Robert',
            lastName: 'Kardashian',
            email: 'robert.kardashian@example.com',
            password: password,
            roles:
              attorneyRoleEntity && customerServiceRoleEntity
                ? [attorneyRoleEntity, customerServiceRoleEntity]
                : [],
            roleId: RoleEnum.user,
            // role: {
            //   id: RoleEnum.user,
            //   name: 'User',
            // },
            // status: {
            //   id: StatusEnum.active,
            //   name: 'Active',
            // },
            statusId: StatusEnum.active,
            org: gideOrg ? gideOrg : defaultOrg,
          }),
        );
      }
    }
  }
}
