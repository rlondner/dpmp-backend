import { Organization } from '../../organizations/domain/organization';

import { UserRole } from '../../user-roles/domain/user-role';

import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: () => Organization,
    nullable: true,
  })
  org?: Organization | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  statusId: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  lastName?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  firstName?: string | null;

  @ApiProperty({
    type: () => [UserRole],
    nullable: true,
  })
  role2?: UserRole[] | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  roleId: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  password?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  provider?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  socialId?: string | null;

  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
