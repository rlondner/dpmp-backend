import {
  // decorators here

  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  country: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  state?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  city: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  postalCode: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  line3?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  line2?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  line1: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
