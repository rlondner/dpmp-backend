import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PublicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
