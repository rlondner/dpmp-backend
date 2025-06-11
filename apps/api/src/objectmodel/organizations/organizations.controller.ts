import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrganizationsServiceBase } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Organization } from './domain/organization';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';
import { FindAllOrganizationsDto } from './dto/find-all-organizations.dto';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'organizations',
  version: '1',
})
export class OrganizationsControllerBase {
  constructor(
    protected readonly organizationsServiceBase: OrganizationsServiceBase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: Organization,
  })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsServiceBase.create(createOrganizationDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Organization),
  })
  async findAll(
    @Query() query: FindAllOrganizationsDto,
  ): Promise<InfinityPaginationResponseDto<Organization>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.organizationsServiceBase.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: Organization,
  })
  findById(@Param('id') id: number) {
    return this.organizationsServiceBase.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: Organization,
  })
  update(
    @Param('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsServiceBase.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  remove(@Param('id') id: number) {
    return this.organizationsServiceBase.remove(id);
  }
}
