import {
  // common
  Injectable,
} from '@nestjs/common';

import { PermissionRepositoryBase } from './infrastructure/persistence/permission.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { CreatePermissionDto } from '../permissions/dto/create-permission.dto';
import { PermissionsServiceBase } from '../permissions/permissions.service';

@Injectable()
export class PermissionsService extends PermissionsServiceBase {
  constructor(
    // Dependencies here
    permissionRepositoryBase: PermissionRepositoryBase,
  ) {
    console.log('Permissions Custom Service constructor called');
    super(permissionRepositoryBase);
  }
}
