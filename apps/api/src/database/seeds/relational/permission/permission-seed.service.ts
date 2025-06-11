import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from '../../../../objectmodel/permissions/infrastructure/persistence/relational/entities/permission.entity';
//import { RoleEnum } from '../../../../objectmodel/roles/roles.enum';
//import { RoleEntity } from '../../../../objectmodel/roles/infrastructure/persistence/relational/entities/role.entity';
import { UserRoleEntity } from '../../../../objectmodel/user-roles/infrastructure/persistence/relational/entities/user-role.entity';

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permRepository: Repository<PermissionEntity>,
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async run() {
    const rolePermissions = {
      Developer: [
        { slug: 'admin.access.users.read', description: 'Read users' },
        { slug: 'admin.access.users.create', description: 'Create users' },
        { slug: 'admin.access.users.update', description: 'Update users' },
        { slug: 'admin.access.roles.read', description: 'Read roles' },
        { slug: 'admin.access.roles.create', description: 'Create roles' },
        { slug: 'admin.access.roles.update', description: 'Update roles' },
        {
          slug: 'admin.access.permissions.read',
          description: 'Read permissions',
        },
        {
          slug: 'admin.access.permissions.create',
          description: 'Create permissions',
        },
        {
          slug: 'admin.access.permissions.update',
          description: 'Update permissions',
        },
      ],
      Admin: [
        { slug: 'admin.access.users.read', description: 'Read users' },
        { slug: 'admin.access.users.create', description: 'Create users' },
        { slug: 'admin.access.users.update', description: 'Update users' },
        { slug: 'admin.access.roles.read', description: 'Read roles' },
        { slug: 'admin.access.roles.create', description: 'Create roles' },
        { slug: 'admin.access.roles.update', description: 'Update roles' },
      ],
      CustomerService: [
        { slug: 'admin.access.users.read', description: 'Read users' },
        { slug: 'admin.access.roles.read', description: 'Read roles' },
      ],
      Attorney: [
        { slug: 'admin.access.users.read', description: 'Read users' },
        { slug: 'admin.access.roles.read', description: 'Read roles' },
        { slug: 'admin.access.users.update', description: 'Update users' },
      ],
    };

    const roleNames = Object.keys(rolePermissions);
    // Distinct permissions contained in all roles
    const permissions = _.uniqBy(
      roleNames.reduce((acc, roleName) => {
        return acc.concat(rolePermissions[roleName]);
      }, []),
      'slug',
    );

    // Getting slugs form permissions
    const permissionSlugs = permissions.map((p) => p.slug);
    // Getting existing permissions from the DB
    const existingPermissions = await this.permRepository.find({
      where: { slug: In(permissionSlugs) },
    });
    // Mapping all permissions to permission entities
    const validPermissions = permissions.map((p) => {
      const existing = existingPermissions.find((e) => e.slug === p.slug);
      if (existing) {
        return existing;
      }
      //return new PermissionEntity();
      return this.permRepository.create({
        slug: p.slug,
        active: true,
        description: p.description || null,
      });
    });
    // Creating / updating permissions
    const savedPermissions = (
      await this.permRepository.save(validPermissions)
    ).reduce((acc, p) => {
      return { ...acc, [p.slug]: p };
    }, {});

    //Creating roles
    const roles = roleNames.map((name) => {
      const permissions = rolePermissions[name].map(
        (p) => savedPermissions[p.slug],
      );
      // Only include properties that exist on UserRoleEntity
      return this.userRoleRepository.create({
        // Make sure these properties exist in UserRoleEntity
        ...(name && { name }),
        ...(permissions && { permissions }),
        active: true,
        // Remove description if not present in UserRoleEntity
      } as any); // Use 'as any' if you are sure these properties exist, or update the entity definition
    });
    const flatRoles = _.flatten(roles);
    const savedRoles = await this.userRoleRepository.save(flatRoles);
  }
}
