import { Session } from '../../../objectmodel/session/domain/session';
import { User } from '../../../objectmodel/users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'roleId'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
