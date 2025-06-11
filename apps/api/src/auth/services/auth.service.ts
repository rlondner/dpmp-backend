import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ErrorType } from '../../common/enums';
import {
  InvalidCredentialsException,
  DisabledUserException,
} from '../../common/http/exceptions';
//import { UserStatus } from '@admin/access/users/user-status.enum';
//import { UserEntity } from '@admin/access/users/user.entity';
import {
  AuthCredentialsRequestDto,
  LoginResponseDto,
  JwtPayload,
} from '../dto';
//import { UserResponseDto } from '../../objectmodel/users_custom/infrastructure/persistence/relational/dto/user-response.dto';
import { UserRepository } from '../../objectmodel/users_custom/infrastructure/persistence/user.repository';
import { HashHelper } from '../../helpers';
//import { UserEntity } from '../../objectmodel/users/infrastructure/persistence/relational/entities/user.entity';
import { TokenService } from './token.service';
import { StatusEnum } from '../../objectmodel/statuses_original/statuses.enum';
import { UserMapper } from '../../objectmodel/users/infrastructure/persistence/relational/mappers/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  /**
   * User authentication
  //  * @param authCredentialsDto {AuthCredentialsRequestDto}
  //  * @returns {Promise<LoginResponseDto>}
   */
  // public async login({
  //   username,
  //   password,
  // }: AuthCredentialsRequestDto): Promise<LoginResponseDto> {
  //   const user = await this.usersRepository.findByEmail(username);

  //   if (!user) {
  //     throw new InvalidCredentialsException();
  //   }

  //   if (!user.password) {
  //     throw new InvalidCredentialsException();
  //   }
  //   const passwordMatch = await HashHelper.compare(password, user.password);

  //   if (!passwordMatch) {
  //     throw new InvalidCredentialsException();
  //   }
  //   if (user.statusId == StatusEnum.blocked) {
  //     throw new DisabledUserException(ErrorType.BlockedUser);
  //   }
  //   if (user.statusId == StatusEnum.inactive) {
  //     throw new DisabledUserException(ErrorType.InactiveUser);
  //   }

  //   const payload: JwtPayload = { id: user.id, email: user.email ?? '' };
  //   const token = await this.tokenService.generateAuthToken(payload);

  //   const userDto = await UserMapper.toDto(user);
  //   //const { permissions, roles } = await UserMapper.toDomain(user);
  //   //const { permissions, roles } = {user.permissions, user.roles} ;
  //   const additionalPermissions = (user.permissions ?? []).map(({ slug }) => slug);
  //   const mappedRoles = (user.roles ?? []).map(({ name, permissions }) => {
  //     const rolePermissions = permissions.map(({ slug }) => slug);
  //     return {
  //       name,
  //       permissions: rolePermissions,
  //     };
  //   });

  //   return {
  //     user: userDto,
  //     token,
  //     //access: {
  //       //additionalPermissions,
  //       //roles: mappedRoles,
  //     //},
  //   };
  // }
}
