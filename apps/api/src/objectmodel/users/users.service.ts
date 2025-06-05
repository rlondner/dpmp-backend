import { OrganizationsService } from '../organizations/organizations.service';
import { Organization } from '../organizations/domain/organization';

import { UserRolesService } from '../user-roles/user-roles.service';
import { UserRole } from '../user-roles/domain/user-role';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryBase } from './infrastructure/persistence/user.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { User } from './domain/user';

@Injectable()
export class UsersServiceBase {
  constructor(
        protected readonly organizationService: OrganizationsService,
    
        protected readonly userRoleService: UserRolesService,   
        // Dependencies here
        protected readonly userRepository: UserRepositoryBase,
  ) {}
    
  
    async create(createUserDto: CreateUserDto) : Promise<User> {
      const dummyUser: User = {
        id: 1 , // Placeholder, will be replaced by actual ID after creation
        org: null,
        statusId: createUserDto.statusId,
        phone: createUserDto.phone,
        lastName: createUserDto.lastName,
        firstName: createUserDto.firstName,
        role2: null,
        roleId: createUserDto.roleId,
        password: createUserDto.password,
        email: createUserDto.email,
        provider: createUserDto.provider,
      createdAt: new Date(),
      updatedAt: new Date(),
      }
      
        return dummyUser
    }

  // async create(createUserDto: CreateUserDto) {
  //   // Do not remove comment below.
  //   // <creating-property />
  //   let org: Organization | null | undefined = undefined;

  //   if (createUserDto.org) {
  //     const orgObject = await this.organizationService.findById(
  //       createUserDto.org.id,
  //     );
  //     if (!orgObject) {
  //       throw new UnprocessableEntityException({
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           org: 'notExists',
  //         },
  //       });
  //     }
  //     org = orgObject;
  //   } else if (createUserDto.org === null) {
  //     org = null;
  //   }

  //   let email: string | null = null;

  //   if (createUserDto.email) {
  //     const userObject = await this.userRepository.findByEmail(
  //       createUserDto.email,
  //     );
  //     if (userObject) {
  //       throw new UnprocessableEntityException({
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           email: 'emailAlreadyExists',
  //         },
  //       });
  //     }
  //     email = createUserDto.email;
  //   }

  //   let role2: UserRole | null | undefined = undefined;

  //   if (createUserDto.role2) {
  //     const role2Object = await this.userRoleService.findById(
  //       createUserDto.role2.id,
  //     );
  //     if (!role2Object) {
  //       throw new UnprocessableEntityException({
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           role2: 'notExists',
  //         },
  //       });
  //     }
  //     role2 = role2Object;
  //   } else if (createUserDto.role2 === null) {
  //     role2 = null;
  //   }

  //   return this.userRepository.create({
  //     // Do not remove comment below.
  //     // <creating-property-payload />
  //     org,

  //     statusId: createUserDto.statusId,

  //     phone: createUserDto.phone,

  //     lastName: createUserDto.lastName,

  //     firstName: createUserDto.firstName,

  //     role2,

  //     roleId: createUserDto.roleId,

  //     password: createUserDto.password,

  //     email: email,

  //     provider: createUserDto.provider,

  //     socialId: createUserDto.socialId,
  //   });
  // }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: User['id']) {
    return this.userRepository.findById(id);
  }

  findByIds(ids: User['id'][]) {
    return this.userRepository.findByIds(ids);
  }



  async update(
    id: User['id'],

    updateUserDto: UpdateUserDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let org: Organization | null | undefined = undefined;

    if (updateUserDto.org) {
      const orgObject = await this.organizationService.findById(
        updateUserDto.org.id,
      );
      if (!orgObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            org: 'notExists',
          },
        });
      }
      org = orgObject;
    } else if (updateUserDto.org === null) {
      org = null;
    }

    let role2: UserRole | null | undefined = undefined;

    if (updateUserDto.role2) {
      const role2Object = await this.userRoleService.findById(
        updateUserDto.role2.id,
      );
      if (!role2Object) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role2: 'notExists',
          },
        });
      }
      role2 = role2Object;
    } else if (updateUserDto.role2 === null) {
      role2 = null;
    }

    return this.userRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      org,

      statusId: updateUserDto.statusId,

      phone: updateUserDto.phone,

      lastName: updateUserDto.lastName,

      firstName: updateUserDto.firstName,

      role2,

      roleId: updateUserDto.roleId,

      password: updateUserDto.password,

      email: updateUserDto.email,

      provider: updateUserDto.provider,

      socialId: updateUserDto.socialId,
    });
  }

  remove(id: User['id']) {
    return this.userRepository.remove(id);
  }
}
