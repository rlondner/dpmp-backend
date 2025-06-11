import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../objectmodel/users/infrastructure/persistence/relational/entities/user.entity';

export const CurrentUser = createParamDecorator<UserEntity>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
