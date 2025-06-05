import { ApiProperty } from '@nestjs/swagger';

export class Organization {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  subscription: string;

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
