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
        // role: {
        //   id: RoleEnum.admin,
        // },
        roleId: RoleEnum.admin as number,        
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
          // role: {
          //   id: RoleEnum.admin,
          //   name: 'Admin',
          // },
          // status: {
          //   id: StatusEnum.active,
          //   name: 'Active',
          // },

          roleId: RoleEnum.admin as number,
          statusId: StatusEnum.active as number,


        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        // role: {
        //   id: RoleEnum.user,
        // },
        roleId: RoleEnum.user as number,

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
          // role: {
          //   id: RoleEnum.user,
          //   name: 'Admin',
          // },
          // status: {
          //   id: StatusEnum.active,
          //   name: 'Active',
          // },
          roleId: RoleEnum.user as number,
          statusId: StatusEnum.active as number,
        }),
      );
    }
  }
}
