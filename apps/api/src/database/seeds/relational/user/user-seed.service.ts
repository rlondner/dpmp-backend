import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { RoleEnum } from '../../../../objectmodel/roles/roles.enum';
import { StatusEnum } from '../../../../objectmodel/statuses_original/statuses.enum';
import { UserEntity } from '../../../../objectmodel/users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        roleId: RoleEnum.admin,
        // role: {
        //   id: RoleEnum.admin,
        // },
      },
    });

    if (!countAdmin) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password,
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
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        roleId: RoleEnum.user,
        // role: {
        //   id: RoleEnum.user,
        // },
      },
    });

    if (!countUser) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);

      await this.repository.save(
        this.repository.create({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password,
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
        }),
      );
    }
  }
}
