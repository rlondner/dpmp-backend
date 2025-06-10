import { ApiProperty } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  active: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  slug: string;

  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
