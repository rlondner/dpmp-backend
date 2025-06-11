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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from '../permissions/dto/create-permission.dto';
import { UpdatePermissionDto } from '../permissions/dto/update-permission.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';
import { PermissionsControllerBase } from '../permissions/permissions.controller';
import { Permission } from '../permissions/domain/permission';
import { FindAllPermissionsDto } from '../permissions/dto/find-all-permissions.dto';
import {
  //SuperUserGuard,
  Permissions,
  // TOKEN_NAME,
} from '../../auth/decorators/permissions.decorator';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'permissions',
  version: '1',
})
export class PermissionsController extends PermissionsControllerBase {
  constructor(permissionsService: PermissionsService) {
    super(permissionsService);
    console.log('PermissionsController constructor called');
  }

  @Post()
  @ApiCreatedResponse({
    type: Permission,
  })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsServiceBase.create(createPermissionDto);
  }

  /**
   * This method is used to find all permissions with pagination.
   * It accepts query parameters for pagination and returns a paginated response.
   *
   * @param query - The query parameters for pagination.
   * @returns A paginated response containing the permissions.
   */
  @Permissions(
    'admin.access.permissions.read',
    'admin.access.permissions.create',
    'admin.access.permissions.update',
    'admin.access.roles.create',
    'admin.access.roles.update',
  )
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Permission),
  })
  override async findAll(
    @Query() query: FindAllPermissionsDto,
  ): Promise<InfinityPaginationResponseDto<Permission>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.permissionsServiceBase.findAllWithPagination({
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
    type: Permission,
  })
  findById(@Param('id') id: number) {
    return this.permissionsServiceBase.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: Permission,
  })
  update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsServiceBase.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  remove(@Param('id') id: number) {
    return this.permissionsServiceBase.remove(id);
  }
}
