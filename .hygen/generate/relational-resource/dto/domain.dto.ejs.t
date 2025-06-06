---
to: apps/api/src/objectmodel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
---
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class <%= name %>Dto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: <% if (idType === 'increment') { -%>number<% } else { -%>string<% } -%>;
}
