import { PermissionDto } from '../../permissions/dto/permission.dto';

import {
  // decorators here

  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateUserRoleDto {
  @ApiProperty({
    required: true,
    type: () => [PermissionDto],
  })
  @ValidateNested()
  @Type(() => PermissionDto)
  @IsArray()
  permissions: PermissionDto[];

  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
