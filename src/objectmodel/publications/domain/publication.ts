import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Publication {
  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  creator?: User | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  body?: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
