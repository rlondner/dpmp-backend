import { Permission } from '../../permissions/domain/permission';

import { ApiProperty } from '@nestjs/swagger';

export class UserRole {
  @ApiProperty({
    type: () => [Permission],
    nullable: false,
  })
  permissions: Permission[];

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  active: boolean;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
