import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersControllerBase } from '../users/users.controller';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController extends UsersControllerBase {
  constructor(usersService: UsersService) {
    super(usersService);
    console.log('UsersController constructor called');
    // You can add any additional initialization logic here if needed
  }
}
