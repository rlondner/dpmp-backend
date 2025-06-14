import { OrganizationDto } from '../../organizations/dto/organization.dto';

import { PermissionDto } from '../../permissions/dto/permission.dto';

import { UserRoleDto } from '../../user-roles/dto/user-role.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    required: false,
    type: () => OrganizationDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrganizationDto)
  @IsNotEmptyObject()
  org?: OrganizationDto | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  statusId: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  lastName?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  firstName?: string | null;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isSuperUser?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => [PermissionDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PermissionDto)
  @IsArray()
  permissions?: PermissionDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [UserRoleDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserRoleDto)
  @IsArray()
  roles?: UserRoleDto[] | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  roleId: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  password?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  email?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  provider?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  socialId?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
