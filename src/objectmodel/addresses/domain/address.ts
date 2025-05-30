import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  country: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  state?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  city: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  postalCode: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  line3?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  line2?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  line1: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
