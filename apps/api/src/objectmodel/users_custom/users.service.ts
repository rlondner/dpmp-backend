
import { UsersServiceBase } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { Organization } from '../organizations/domain/organization'; 
import { UserRole } from '../user-roles/domain/user-role';
import { UserRolesService } from '../user-roles/user-roles.service';

import { UserRepositoryBase } from '../users/infrastructure/persistence/user.repository';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { NullableType } from '../../utils/types/nullable.type';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

import { IPaginationOptions } from '../../utils/types/pagination-options';


//type NullableType<T> = T | null;

export class UsersService extends UsersServiceBase {
  private readonly extendedUserRepository: UserRepository;

    constructor(
        organizationService: OrganizationsService,
        userRoleService: UserRolesService,
        userRepository: UserRepository,
      ) {
        console.log('UsersService constructor called');
        super(organizationService, userRoleService, userRepository);
        //this.extendedUserRepository = userRepository;
      }

      override async create(createUserDto: CreateUserDto) : Promise<User>  {
          // Do not remove comment below.
          // <creating-property />
          let org: Organization | null | undefined = undefined;
      
          if (createUserDto.org) {
            const orgObject = await this.organizationService.findById(
              createUserDto.org.id,
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
          } else if (createUserDto.org === null) {
            org = null;
          }
      
          let email: string | null = null;
      
          if (createUserDto.email) {
            const userObject = await this.extendedUserRepository.findByEmail(
              createUserDto.email,
            );
            if (userObject) {
              throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                  email: 'emailAlreadyExists',
                },
              });
            }
            email = createUserDto.email;
          }
      
          let role2: UserRole | null | undefined = undefined;
      
          if (createUserDto.role2) {
            const role2Object = await this.userRoleService.findById(
              createUserDto.role2.id,
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
          } else if (createUserDto.role2 === null) {
            role2 = null;
          }
      
          return this.userRepository.create({
            // Do not remove comment below.
            // <creating-property-payload />
            org,
      
            statusId: createUserDto.statusId,
      
            phone: createUserDto.phone,
      
            lastName: createUserDto.lastName,
      
            firstName: createUserDto.firstName,
      
            role2,
      
            roleId: createUserDto.roleId,
      
            password: createUserDto.password,
      
            email: email,
      
            provider: createUserDto.provider,
      
            socialId: createUserDto.socialId,
          });
        }

      findByEmail(email: User['email']): Promise<NullableType<User>> {
        return this.extendedUserRepository.findByEmail(email);
      }
    
      findBySocialIdAndProvider({
        socialId,
        provider,
      }: {
        socialId: User['socialId'];
        provider: User['provider'];
      }): Promise<NullableType<User>> {
        return this.extendedUserRepository.findBySocialIdAndProvider({
          socialId,
          provider,
        });
      }
  // etc.
}

